export interface PasswordInput {
    password: string;
  }
  
  export interface PasswordFeatures {
    length: number;
    num_upper: number;
    num_lower: number;
    num_digit: number;
    num_symbol: number;
    has_qwerty: number;
    has_123456: number;
    has_password: number;
    has_admin: number;
    has_repeating: number;
    unique_chars: number;
    entropy: number;
  }
  
  export interface PasswordResponse {
    strength: number;
    confidence: number;
    features: PasswordFeatures;
  }
  