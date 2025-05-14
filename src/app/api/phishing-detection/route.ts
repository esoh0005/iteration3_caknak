import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email content is required" },
        { status: 400 }
      );
    }

    // Create a Python script to run the model and risk heuristics
    const pythonScript = `
import re
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import json
import sys

def detect_external_links(text):
    urls = re.findall(r'https?://\\S+', text)
    return bool(urls), urls

def detect_urgency_language(text):
    urgency_keywords = ['urgent', 'immediately', 'asap', 'act now', 'verify now', 'limited time', 'important notice']
    found = [kw for kw in urgency_keywords if kw in text.lower()]
    return bool(found), found

def detect_suspicious_keywords(text):
    keywords = ['login', 'update your account', 'verify credentials', 'reset your password', 'unusual activity']
    found = [kw for kw in keywords if kw in text.lower()]
    return bool(found), found

def detect_personalization(text):
    personalization_markers = ['dear', 'hello', 'hi', 'user', 'customer', 'subscriber']
    found = [word for word in personalization_markers if word in text.lower()]
    return bool(found), found

def detect_reward_or_penalty(text):
    bait_phrases = ['win a prize', 'get a reward', 'claim your gift', 'account suspended', 'will be deactivated']
    return any(phrase in text.lower() for phrase in bait_phrases)

def detect_bad_grammar(text):
    grammar_issues = ['.  ', ' ,', '!!', '???', 'plz', 'u r', 'click heree', 'recieve']
    return any(issue in text.lower() for issue in grammar_issues)

def detect_html_obfuscation(text):
    return bool(re.search(r'(<[^>]+>)|(&#\\d+;)', text))

def detect_mismatch_links(text):
    return bool(re.findall(r'<a[^>]*href="(.*?)"[^>]*>(.*?)</a>', text))

def analyze_risks(email_text):
    risks = []
    has_links, urls = detect_external_links(email_text)
    if has_links:
        risks.append(f"Contains external links: {', '.join(urls)}")
    has_urgency, urgency_terms = detect_urgency_language(email_text)
    if has_urgency:
        risks.append(f"Uses urgency language: {', '.join(urgency_terms)}")
    has_suspicious, suspicious_terms = detect_suspicious_keywords(email_text)
    if has_suspicious:
        risks.append(f"Suspicious keywords or action requests: {', '.join(suspicious_terms)}")
    has_personalization, personalization_terms = detect_personalization(email_text)
    if has_personalization:
        risks.append(f"Generic or fake personalization: {', '.join(personalization_terms)}")
    if detect_reward_or_penalty(email_text):
        risks.append("Bait with reward or penalty")
    if detect_bad_grammar(email_text):
        risks.append("Poor grammar or misspellings")
    if detect_html_obfuscation(email_text):
        risks.append("Obfuscated content or HTML tricks")
    if detect_mismatch_links(email_text):
        risks.append("Mismatch between link text and actual URL")
    return risks

def predict_email(email_text):
    model_name = "cybersectony/phishing-email-detection-distilbert_v2.4.1"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    inputs = tokenizer(
        email_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    probs = predictions[0].tolist()
    labels = {
        "legitimate_email": probs[0],
        "phishing_url": probs[1],
        "legitimate_url": probs[2],
        "phishing_url_alt": probs[3]
    }
    max_label = max(labels.items(), key=lambda x: x[1])
    result = {
        "prediction": max_label[0],
        "confidence": max_label[1],
        "all_probabilities": labels,
        "risk_score": int(probs[1] * 100),
        "risk_factors": analyze_risks(email_text)
    }
    print(json.dumps(result))

email_text = '''${email}'''
predict_email(email_text)
`;

    // Write the script to a temporary file
    const scriptPath = path.join(process.cwd(), "temp_phishing_script.py");
    require("fs").writeFileSync(scriptPath, pythonScript);

    // Run the Python script
    const pythonProcess = spawn("python", [scriptPath]);
    
    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    return await new Promise<Response>((resolve) => {
      pythonProcess.on("close", (code) => {
        // Clean up the temporary file
        require("fs").unlinkSync(scriptPath);

        if (code !== 0) {
          resolve(
            NextResponse.json(
              { error: "Failed to analyze email", details: error },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const parsedResult = JSON.parse(result);
          resolve(NextResponse.json(parsedResult));
        } catch (e: any) {
          resolve(
            NextResponse.json(
              { error: "Failed to parse result", details: e.message },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
} 
