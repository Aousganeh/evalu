// Auto-generated fallback seed dataset for offline / static Vercel deployment
export const seedInteractions = [
  {
    "interaction_id": "INT-1001",
    "timestamp": "2026-10-01T09:14:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9011",
    "text": "Salam, bu gün balansdan səbəbsiz 8 AZN çıxıldı. Nömrəm +994 50 234 56 78, hesab kodum ACC-9011. Xahiş edirəm pulu qaytarın.",
    "status": "open",
    "original_text": "Salam, bu gün balansdan səbəbsiz 8 AZN çıxıldı. Nömrəm +994 50 234 56 78, hesab kodum ACC-9011. Xahiş edirəm pulu qaytarın.",
    "redacted_text": "Salam, bu gün balansdan səbəbsiz 8 AZN çıxıldı. Nömrəm [REDACTED_PHONE], hesab kodum [REDACTED_ACCOUNT_ID]. Xahiş edirəm pulu qaytarın.",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 50 234 56 78",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9011",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1002",
    "timestamp": "2026-10-01T09:42:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9012",
    "text": "Здравствуйте! С моей карты 4169-8201-9283-1102 списали 15 манат за интернет, хотя у меня активен безлимитный пакет. Мой номер +7 916 234 56 78.",
    "status": "open",
    "original_text": "Здравствуйте! С моей карты 4169-8201-9283-1102 списали 15 манат за интернет, хотя у меня активен безлимитный пакет. Мой номер +7 916 234 56 78.",
    "redacted_text": "Здравствуйте! С моей карты [REDACTED_CARD] списали 15 манат за интернет, хотя у меня активен безлимитный пакет. Мой номер [REDACTED_PHONE].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "CARD",
        "original": "4169-8201-9283-1102",
        "replacement": "[REDACTED_CARD]"
      },
      {
        "type": "PHONE",
        "original": "+7 916 234 56 78",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1003",
    "timestamp": "2026-10-01T10:15:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9013",
    "text": "I was charged $24 for unexpected background data roaming. My customer account is ACC-9013 and contact email is john.smith@company.com. Please refund.",
    "status": "open",
    "original_text": "I was charged $24 for unexpected background data roaming. My customer account is ACC-9013 and contact email is john.smith@company.com. Please refund.",
    "redacted_text": "I was charged $24 for unexpected background data roaming. My customer account is [REDACTED_ACCOUNT_ID] and contact email is [REDACTED_EMAIL]. Please refund.",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "john.smith@company.com",
        "replacement": "[REDACTED_EMAIL]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9013",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1004",
    "timestamp": "2026-10-01T11:05:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9014",
    "text": "Xırdalan ərazisində 4G internet çox zəif işləyir, sürət 1 Mbps-ə çatmır. Əlaqə üçün +994 55 412 88 90 nömrəsinə zəng edin.",
    "status": "open",
    "original_text": "Xırdalan ərazisində 4G internet çox zəif işləyir, sürət 1 Mbps-ə çatmır. Əlaqə üçün +994 55 412 88 90 nömrəsinə zəng edin.",
    "redacted_text": "Xırdalan ərazisində 4G internet çox zəif işləyir, sürət 1 Mbps-ə çatmır. Əlaqə üçün [REDACTED_PHONE] nömrəsinə zəng edin.",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 55 412 88 90",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1005",
    "timestamp": "2026-10-01T11:30:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9015",
    "text": "В районе метро Сахил постоянно пропадает 4G, страницы не открываются. Проверьте вышку связи, аккаунт CUST-9015.",
    "status": "open",
    "original_text": "В районе метро Сахил постоянно пропадает 4G, страницы не открываются. Проверьте вышку связи, аккаунт CUST-9015.",
    "redacted_text": "В районе метро Сахил постоянно пропадает 4G, страницы не открываются. Проверьте вышку связи, аккаунт [REDACTED_ACCOUNT_ID].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "ACCOUNT_ID",
        "original": "CUST-9015",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1006",
    "timestamp": "2026-10-01T12:00:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9016",
    "text": "Constant network timeouts and packet loss in downtown business district. Mobile connection keeps dropping. My email is alex.t@enterprise.org.",
    "status": "open",
    "original_text": "Constant network timeouts and packet loss in downtown business district. Mobile connection keeps dropping. My email is alex.t@enterprise.org.",
    "redacted_text": "Constant network timeouts and packet loss in downtown business district. Mobile connection keeps dropping. My email is [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "alex.t@enterprise.org",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1007",
    "timestamp": "2026-10-01T13:20:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9017",
    "text": "Yeni SIM karta keçəndən sonra bankdan təsdiq OTP SMS-ləri gəlmir. Şəxsi kabinet ID: 44102, telefon +994 70 890 12 34.",
    "status": "open",
    "original_text": "Yeni SIM karta keçəndən sonra bankdan təsdiq OTP SMS-ləri gəlmir. Şəxsi kabinet ID: 44102, telefon +994 70 890 12 34.",
    "redacted_text": "Yeni SIM karta keçəndən sonra bankdan təsdiq OTP SMS-ləri gəlmir. Şəxsi kabinet ID: [REDACTED_ACCOUNT_ID], telefon [REDACTED_PHONE].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 70 890 12 34",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "44102",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1008",
    "timestamp": "2026-10-01T14:10:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9018",
    "text": "После замены сим-карты не приходят смс с кодами авторизации от банка. Мой номер +7 925 889 01 23, аккаунт ACC-9018.",
    "status": "open",
    "original_text": "После замены сим-карты не приходят смс с кодами авторизации от банка. Мой номер +7 925 889 01 23, аккаунт ACC-9018.",
    "redacted_text": "После замены сим-карты не приходят смс с кодами авторизации от банка. Мой номер [REDACTED_PHONE], аккаунт [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 925 889 01 23",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9018",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1009",
    "timestamp": "2026-10-01T14:45:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9019",
    "text": "Unable to receive two-factor authentication OTP SMS after eSIM transfer. Phone is +1 415 555 0199, account ACC-9019.",
    "status": "open",
    "original_text": "Unable to receive two-factor authentication OTP SMS after eSIM transfer. Phone is +1 415 555 0199, account ACC-9019.",
    "redacted_text": "Unable to receive two-factor authentication OTP SMS after eSIM transfer. Phone is [REDACTED_PHONE], account [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+1 415 555 0199",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9019",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1010",
    "timestamp": "2026-10-01T15:30:00Z",
    "channel": "Review",
    "language": "az",
    "customer_id": "CUST-9020",
    "text": "Mobil tətbiqə daxil olmaq olmur, barmaq izi ilə girişdə proqram çökür və bağlanır. Telefonum iPhone 14, istifadəçi email: leyla.a@box.az.",
    "status": "open",
    "original_text": "Mobil tətbiqə daxil olmaq olmur, barmaq izi ilə girişdə proqram çökür və bağlanır. Telefonum iPhone 14, istifadəçi email: leyla.a@box.az.",
    "redacted_text": "Mobil tətbiqə daxil olmaq olmur, barmaq izi ilə girişdə proqram çökür və bağlanır. Telefonum iPhone 14, istifadəçi email: [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "leyla.a@box.az",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1011",
    "timestamp": "2026-10-01T16:15:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9021",
    "text": "После последнего обновления приложение вылетает при переходе в раздел оплаты. Карта 5425-1234-5678-9012. Почините!",
    "status": "open",
    "original_text": "После последнего обновления приложение вылетает при переходе в раздел оплаты. Карта 5425-1234-5678-9012. Почините!",
    "redacted_text": "После последнего обновления приложение вылетает при переходе в раздел оплаты. Карта [REDACTED_CARD]. Почините!",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "CARD",
        "original": "5425-1234-5678-9012",
        "replacement": "[REDACTED_CARD]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1012",
    "timestamp": "2026-10-01T16:50:00Z",
    "channel": "Review",
    "language": "en",
    "customer_id": "CUST-9022",
    "text": "The mobile app keeps crashing immediately on the splash screen upon login. Cannot check bill balance. My email: mark.taylor@gmail.com.",
    "status": "open",
    "original_text": "The mobile app keeps crashing immediately on the splash screen upon login. Cannot check bill balance. My email: mark.taylor@gmail.com.",
    "redacted_text": "The mobile app keeps crashing immediately on the splash screen upon login. Cannot check bill balance. My email: [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "mark.taylor@gmail.com",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1013",
    "timestamp": "2026-10-02T09:00:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9023",
    "text": "Dünən zəng mərkəzindən Fuad bəy məsələmi 5 dəqiqəyə həll etdi. Əla və operativ xidmətə görə minnətdaram! Nömrəm +994 50 999 11 22.",
    "status": "resolved",
    "original_text": "Dünən zəng mərkəzindən Fuad bəy məsələmi 5 dəqiqəyə həll etdi. Əla və operativ xidmətə görə minnətdaram! Nömrəm +994 50 999 11 22.",
    "redacted_text": "Dünən zəng mərkəzindən Fuad bəy məsələmi 5 dəqiqəyə həll etdi. Əla və operativ xidmətə görə minnətdaram! Nömrəm [REDACTED_PHONE].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 50 999 11 22",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1014",
    "timestamp": "2026-10-02T09:30:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9024",
    "text": "Оператор Анна очень вежливо и быстро помогла подключить правильный роуминг-тариф. Отличная поддержка клиентов, спасибо!",
    "status": "resolved",
    "original_text": "Оператор Анна очень вежливо и быстро помогла подключить правильный роуминг-тариф. Отличная поддержка клиентов, спасибо!",
    "redacted_text": "Оператор Анна очень вежливо и быстро помогла подключить правильный роуминг-тариф. Отличная поддержка клиентов, спасибо!",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1015",
    "timestamp": "2026-10-02T10:10:00Z",
    "channel": "Review",
    "language": "en",
    "customer_id": "CUST-9025",
    "text": "Super quick and professional customer support from the call centre representative. Resolved my billing inquiry in minutes! Highly satisfied.",
    "status": "resolved",
    "original_text": "Super quick and professional customer support from the call centre representative. Resolved my billing inquiry in minutes! Highly satisfied.",
    "redacted_text": "Super quick and professional customer support from the call centre representative. Resolved my billing inquiry in minutes! Highly satisfied.",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1016",
    "timestamp": "2026-10-02T11:00:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9026",
    "text": "Gecə vaxtı telefonumdan 12 AZN data xərci tutulub, halbuki WiFi qoşulu idi. Hesab nömrəm ACC-9026, telefon +994 51 333 44 55.",
    "status": "open",
    "original_text": "Gecə vaxtı telefonumdan 12 AZN data xərci tutulub, halbuki WiFi qoşulu idi. Hesab nömrəm ACC-9026, telefon +994 51 333 44 55.",
    "redacted_text": "Gecə vaxtı telefonumdan 12 AZN data xərci tutulub, halbuki WiFi qoşulu idi. Hesab nömrəm [REDACTED_ACCOUNT_ID], telefon [REDACTED_PHONE].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 51 333 44 55",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9026",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1017",
    "timestamp": "2026-10-02T11:45:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9027",
    "text": "Почему с баланса повторно сняли деньги за подписку на интернет? Мой лицевой счет CUST-9027, телефон +7 903 555 01 92. Требую возврат.",
    "status": "open",
    "original_text": "Почему с баланса повторно сняли деньги за подписку на интернет? Мой лицевой счет CUST-9027, телефон +7 903 555 01 92. Требую возврат.",
    "redacted_text": "Почему с баланса повторно сняли деньги за подписку на интернет? Мой лицевой счет [REDACTED_ACCOUNT_ID], телефон [REDACTED_PHONE]. Требую возврат.",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 903 555 01 92",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "CUST-9027",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1018",
    "timestamp": "2026-10-02T12:20:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9028",
    "text": "Extra unexplainable data charges of $18 on my monthly telecom invoice. Card billed: 4000 1234 5678 9010. Account ACC-9028.",
    "status": "open",
    "original_text": "Extra unexplainable data charges of $18 on my monthly telecom invoice. Card billed: 4000 1234 5678 9010. Account ACC-9028.",
    "redacted_text": "Extra unexplainable data charges of $18 on my monthly telecom invoice. Card billed: [REDACTED_CARD]. Account [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "CARD",
        "original": "4000 1234 5678 9010",
        "replacement": "[REDACTED_CARD]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9028",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1019",
    "timestamp": "2026-10-02T13:10:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9029",
    "text": "Sumqayıt yolunda şəbəkə tamamilə itir, zənglər qırılır və internet açılmır. Əlaqə: +994 50 777 66 55.",
    "status": "open",
    "original_text": "Sumqayıt yolunda şəbəkə tamamilə itir, zənglər qırılır və internet açılmır. Əlaqə: +994 50 777 66 55.",
    "redacted_text": "Sumqayıt yolunda şəbəkə tamamilə itir, zənglər qırılır və internet açılmır. Əlaqə: [REDACTED_PHONE].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 50 777 66 55",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1020",
    "timestamp": "2026-10-02T14:00:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9030",
    "text": "Скорость домашнего 4G роутера упала до нуля, индикатор горит красным. Лицевой счет ACC-9030, адрес Баку, ул. Низами.",
    "status": "open",
    "original_text": "Скорость домашнего 4G роутера упала до нуля, индикатор горит красным. Лицевой счет ACC-9030, адрес Баку, ул. Низами.",
    "redacted_text": "Скорость домашнего 4G роутера упала до нуля, индикатор горит красным. Лицевой счет [REDACTED_ACCOUNT_ID], адрес Баку, ул. Низами.",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9030",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1021",
    "timestamp": "2026-10-02T14:40:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9031",
    "text": "Severe 5G/LTE signal degradation in suburban area. Signal drops to 1 bar indoors. Account ACC-9031, contact: sarah.w@techcorp.com.",
    "status": "open",
    "original_text": "Severe 5G/LTE signal degradation in suburban area. Signal drops to 1 bar indoors. Account ACC-9031, contact: sarah.w@techcorp.com.",
    "redacted_text": "Severe 5G/LTE signal degradation in suburban area. Signal drops to 1 bar indoors. Account [REDACTED_ACCOUNT_ID], contact: [REDACTED_EMAIL].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "sarah.w@techcorp.com",
        "replacement": "[REDACTED_EMAIL]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9031",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1022",
    "timestamp": "2026-10-02T15:20:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9032",
    "text": "Bank kartımdan əməliyyat üçün tələb olunan təsdiq kodu (OTP) 30 dəqiqədir çatmır. Əlaqə: +994 55 222 33 44, müştəri ID: 55901.",
    "status": "open",
    "original_text": "Bank kartımdan əməliyyat üçün tələb olunan təsdiq kodu (OTP) 30 dəqiqədir çatmır. Əlaqə: +994 55 222 33 44, müştəri ID: 55901.",
    "redacted_text": "Bank kartımdan əməliyyat üçün tələb olunan təsdiq kodu (OTP) 30 dəqiqədir çatmır. Əlaqə: [REDACTED_PHONE], müştəri ID: [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 55 222 33 44",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "55901",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1023",
    "timestamp": "2026-10-02T16:00:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9033",
    "text": "Не могу войти в онлайн-банк, потому что не приходят смс-коды на мой номер +7 915 444 33 22. Аккаунт CUST-9033.",
    "status": "open",
    "original_text": "Не могу войти в онлайн-банк, потому что не приходят смс-коды на мой номер +7 915 444 33 22. Аккаунт CUST-9033.",
    "redacted_text": "Не могу войти в онлайн-банк, потому что не приходят смс-коды на мой номер [REDACTED_PHONE]. Аккаунт [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 915 444 33 22",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "CUST-9033",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1024",
    "timestamp": "2026-10-02T16:30:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9034",
    "text": "SMS verification code for corporate portal failed to deliver multiple times to +1 202 555 0147. Account ACC-9034.",
    "status": "open",
    "original_text": "SMS verification code for corporate portal failed to deliver multiple times to +1 202 555 0147. Account ACC-9034.",
    "redacted_text": "SMS verification code for corporate portal failed to deliver multiple times to [REDACTED_PHONE]. Account [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+1 202 555 0147",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9034",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1025",
    "timestamp": "2026-10-03T09:15:00Z",
    "channel": "Review",
    "language": "az",
    "customer_id": "CUST-9035",
    "text": "Tətbiq yenilənəndən sonra şifrəni qəbul etmir və xəta kodu 500 verir. Email: rashad.k@inbox.az. Dərhal aradan qaldırın.",
    "status": "open",
    "original_text": "Tətbiq yenilənəndən sonra şifrəni qəbul etmir və xəta kodu 500 verir. Email: rashad.k@inbox.az. Dərhal aradan qaldırın.",
    "redacted_text": "Tətbiq yenilənəndən sonra şifrəni qəbul etmir və xəta kodu 500 verir. Email: [REDACTED_EMAIL]. Dərhal aradan qaldırın.",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "rashad.k@inbox.az",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1026",
    "timestamp": "2026-10-03T10:00:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9036",
    "text": "Не работает авторизация через Face ID в мобильном приложении, черный экран при старте. Телефон +7 985 111 22 33.",
    "status": "open",
    "original_text": "Не работает авторизация через Face ID в мобильном приложении, черный экран при старте. Телефон +7 985 111 22 33.",
    "redacted_text": "Не работает авторизация через Face ID в мобильном приложении, черный экран при старте. Телефон [REDACTED_PHONE].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 985 111 22 33",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1027",
    "timestamp": "2026-10-03T10:45:00Z",
    "channel": "Review",
    "language": "en",
    "customer_id": "CUST-9037",
    "text": "App login loop error. Whenever I enter valid credentials it redirects back to login page. Email: devon.b@example.net.",
    "status": "open",
    "original_text": "App login loop error. Whenever I enter valid credentials it redirects back to login page. Email: devon.b@example.net.",
    "redacted_text": "App login loop error. Whenever I enter valid credentials it redirects back to login page. Email: [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "devon.b@example.net",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1028",
    "timestamp": "2026-10-03T11:30:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9038",
    "text": "Dəstək xidmətindən Nərmin xanıma təşəkkürlər, rouminq problemini səbirlə izah edib aktivləşdirdi. Əla xidmət!",
    "status": "resolved",
    "original_text": "Dəstək xidmətindən Nərmin xanıma təşəkkürlər, rouminq problemini səbirlə izah edib aktivləşdirdi. Əla xidmət!",
    "redacted_text": "Dəstək xidmətindən Nərmin xanıma təşəkkürlər, rouminq problemini səbirlə izah edib aktivləşdirdi. Əla xidmət!",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1029",
    "timestamp": "2026-10-03T12:15:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9039",
    "text": "Хочу поблагодарить службу поддержки за оперативную замену сим-карты без задержек. Все работает прекрасно!",
    "status": "resolved",
    "original_text": "Хочу поблагодарить службу поддержки за оперативную замену сим-карты без задержек. Все работает прекрасно!",
    "redacted_text": "Хочу поблагодарить службу поддержки за оперативную замену сим-карты без задержек. Все работает прекрасно!",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1030",
    "timestamp": "2026-10-03T13:00:00Z",
    "channel": "Review",
    "language": "en",
    "customer_id": "CUST-9040",
    "text": "Outstanding technical support! The representative patiently walked me through the APN network reconfiguration. Kudos!",
    "status": "resolved",
    "original_text": "Outstanding technical support! The representative patiently walked me through the APN network reconfiguration. Kudos!",
    "redacted_text": "Outstanding technical support! The representative patiently walked me through the APN network reconfiguration. Kudos!",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1031",
    "timestamp": "2026-10-03T13:45:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9041",
    "text": "Xaricə getməmişdən əvvəl interneti bağlamışdım, amma 45 AZN rouminq borcu yazılıb. Kart: 4169 0012 3456 7890, nömrə +994 77 123 99 88. Düzəliş edin.",
    "status": "open",
    "original_text": "Xaricə getməmişdən əvvəl interneti bağlamışdım, amma 45 AZN rouminq borcu yazılıb. Kart: 4169 0012 3456 7890, nömrə +994 77 123 99 88. Düzəliş edin.",
    "redacted_text": "Xaricə getməmişdən əvvəl interneti bağlamışdım, amma 45 AZN rouminq borcu yazılıb. Kart: [REDACTED_CARD], nömrə [REDACTED_PHONE]. Düzəliş edin.",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "CARD",
        "original": "4169 0012 3456 7890",
        "replacement": "[REDACTED_CARD]"
      },
      {
        "type": "PHONE",
        "original": "+994 77 123 99 88",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1032",
    "timestamp": "2026-10-03T14:30:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9042",
    "text": "Обнаружил непонятное списание 22 маната за платные услуги, которые я никогда не подключал. Номер +7 905 678 90 12, счет ACC-9042.",
    "status": "open",
    "original_text": "Обнаружил непонятное списание 22 маната за платные услуги, которые я никогда не подключал. Номер +7 905 678 90 12, счет ACC-9042.",
    "redacted_text": "Обнаружил непонятное списание 22 маната за платные услуги, которые я никогда не подключал. Номер [REDACTED_PHONE], счет [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 905 678 90 12",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9042",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1033",
    "timestamp": "2026-10-03T15:15:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9043",
    "text": "Unauthorized recurring subscription charge of $15 on invoice. Credit card: 5500-1122-3344-5566, account ACC-9043. Refund immediately.",
    "status": "open",
    "original_text": "Unauthorized recurring subscription charge of $15 on invoice. Credit card: 5500-1122-3344-5566, account ACC-9043. Refund immediately.",
    "redacted_text": "Unauthorized recurring subscription charge of $15 on invoice. Credit card: [REDACTED_CARD], account [REDACTED_ACCOUNT_ID]. Refund immediately.",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "CARD",
        "original": "5500-1122-3344-5566",
        "replacement": "[REDACTED_CARD]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9043",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1034",
    "timestamp": "2026-10-03T16:00:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9044",
    "text": "Yasamal rayonunda axşam saatlarında internet kəsilir və modem qırmızı yanır. Şəxsi kabinet ACC-9044, əlaqə +994 50 312 45 67.",
    "status": "open",
    "original_text": "Yasamal rayonunda axşam saatlarında internet kəsilir və modem qırmızı yanır. Şəxsi kabinet ACC-9044, əlaqə +994 50 312 45 67.",
    "redacted_text": "Yasamal rayonunda axşam saatlarında internet kəsilir və modem qırmızı yanır. Şəxsi kabinet [REDACTED_ACCOUNT_ID], əlaqə [REDACTED_PHONE].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 50 312 45 67",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9044",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1035",
    "timestamp": "2026-10-03T16:45:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9045",
    "text": "Ужасная скорость 4G в центре города, видео грузится в 240p, невозможно работать удаленно. Аккаунт CUST-9045.",
    "status": "open",
    "original_text": "Ужасная скорость 4G в центре города, видео грузится в 240p, невозможно работать удаленно. Аккаунт CUST-9045.",
    "redacted_text": "Ужасная скорость 4G в центре города, видео грузится в 240p, невозможно работать удаленно. Аккаунт [REDACTED_ACCOUNT_ID].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "ACCOUNT_ID",
        "original": "CUST-9045",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1036",
    "timestamp": "2026-10-04T09:30:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9046",
    "text": "High ping of 450ms and recurring packet loss during remote video conference calls. Account ACC-9046, email: robert.p@global.com.",
    "status": "open",
    "original_text": "High ping of 450ms and recurring packet loss during remote video conference calls. Account ACC-9046, email: robert.p@global.com.",
    "redacted_text": "High ping of 450ms and recurring packet loss during remote video conference calls. Account [REDACTED_ACCOUNT_ID], email: [REDACTED_EMAIL].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "robert.p@global.com",
        "replacement": "[REDACTED_EMAIL]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9046",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Network Slowdown & Coverage",
      "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops.",
      "urgency": "medium",
      "suggested_owner": "Network",
      "repeat_contact_risk": "medium",
      "confidence": 0.86,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1037",
    "timestamp": "2026-10-04T10:15:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9047",
    "text": "SIM kartım bloklandı və PUK kodunu daxil edəndə xəta verir. Nömrəm +994 55 600 70 80, şəxsiyyət vəsiqəsi FIN: 5A8B9C1.",
    "status": "open",
    "original_text": "SIM kartım bloklandı və PUK kodunu daxil edəndə xəta verir. Nömrəm +994 55 600 70 80, şəxsiyyət vəsiqəsi FIN: 5A8B9C1.",
    "redacted_text": "SIM kartım bloklandı və PUK kodunu daxil edəndə xəta verir. Nömrəm [REDACTED_PHONE], şəxsiyyət vəsiqəsi [REDACTED_FIN].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+994 55 600 70 80",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "FIN_CODE",
        "original": "FIN: 5A8B9C1",
        "replacement": "[REDACTED_FIN]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1038",
    "timestamp": "2026-10-04T11:00:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9048",
    "text": "Не приходят коды двухфакторной аутентификации от Telegram и WhatsApp после поездки за границу. Номер +7 926 555 43 21.",
    "status": "open",
    "original_text": "Не приходят коды двухфакторной аутентификации от Telegram и WhatsApp после поездки за границу. Номер +7 926 555 43 21.",
    "redacted_text": "Не приходят коды двухфакторной аутентификации от Telegram и WhatsApp после поездки за границу. Номер [REDACTED_PHONE].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+7 926 555 43 21",
        "replacement": "[REDACTED_PHONE]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1039",
    "timestamp": "2026-10-04T11:45:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9049",
    "text": "SMS delivery gateway failure for incoming banking notifications. Phone: +1 312 555 0188, account ACC-9049.",
    "status": "open",
    "original_text": "SMS delivery gateway failure for incoming banking notifications. Phone: +1 312 555 0188, account ACC-9049.",
    "redacted_text": "SMS delivery gateway failure for incoming banking notifications. Phone: [REDACTED_PHONE], account [REDACTED_ACCOUNT_ID].",
    "redactions_count": 2,
    "redactions": [
      {
        "type": "PHONE",
        "original": "+1 312 555 0188",
        "replacement": "[REDACTED_PHONE]"
      },
      {
        "type": "ACCOUNT_ID",
        "original": "ACC-9049",
        "replacement": "[REDACTED_ACCOUNT_ID]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "SIM Card & OTP Issues",
      "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue.",
      "urgency": "high",
      "suggested_owner": "Support",
      "repeat_contact_risk": "high",
      "confidence": 0.89,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1040",
    "timestamp": "2026-10-04T12:30:00Z",
    "channel": "Review",
    "language": "az",
    "customer_id": "CUST-9050",
    "text": "Tətbiqdə kartla balans artırmaq istəyirəm, amma hər dəfə server xətası göstərir. İstifadəçi email: elvin.m@code.az.",
    "status": "open",
    "original_text": "Tətbiqdə kartla balans artırmaq istəyirəm, amma hər dəfə server xətası göstərir. İstifadəçi email: elvin.m@code.az.",
    "redacted_text": "Tətbiqdə kartla balans artırmaq istəyirəm, amma hər dəfə server xətası göstərir. İstifadəçi email: [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "elvin.m@code.az",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1041",
    "timestamp": "2026-10-04T13:15:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9051",
    "text": "При попытке привязать карту 4012-3456-7890-1234 в приложении выходит сообщение 'Внутренняя ошибка сервера'. Сделайте исправление.",
    "status": "open",
    "original_text": "При попытке привязать карту 4012-3456-7890-1234 в приложении выходит сообщение 'Внутренняя ошибка сервера'. Сделайте исправление.",
    "redacted_text": "При попытке привязать карту [REDACTED_CARD] в приложении выходит сообщение 'Внутренняя ошибка сервера'. Сделайте исправление.",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "CARD",
        "original": "4012-3456-7890-1234",
        "replacement": "[REDACTED_CARD]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Mobile App Login & Crash",
      "summary": "Mobile application crashes or authentication authentication failure prevents login.",
      "urgency": "medium",
      "suggested_owner": "Product",
      "repeat_contact_risk": "medium",
      "confidence": 0.88,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1042",
    "timestamp": "2026-10-04T14:00:00Z",
    "channel": "Review",
    "language": "en",
    "customer_id": "CUST-9052",
    "text": "App payment gateway keeps freezing on authorization step. Card charged but balance not updated. Contact: lisa.ray@service.net.",
    "status": "open",
    "original_text": "App payment gateway keeps freezing on authorization step. Card charged but balance not updated. Contact: lisa.ray@service.net.",
    "redacted_text": "App payment gateway keeps freezing on authorization step. Card charged but balance not updated. Contact: [REDACTED_EMAIL].",
    "redactions_count": 1,
    "redactions": [
      {
        "type": "EMAIL",
        "original": "lisa.ray@service.net",
        "replacement": "[REDACTED_EMAIL]"
      }
    ],
    "analysis": {
      "sentiment": "negative",
      "topic": "Unexpected Data Charges",
      "summary": "Customer reports unexpected deductions or disputed data charges.",
      "urgency": "high",
      "suggested_owner": "Billing",
      "repeat_contact_risk": "high",
      "confidence": 0.92,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1043",
    "timestamp": "2026-10-04T14:45:00Z",
    "channel": "Call Centre",
    "language": "az",
    "customer_id": "CUST-9053",
    "text": "Çox sağ olun, operator Rauf bəy zəng zamanı itmiş nömrəmi tez bərpa etdi və yeni SIM kart təqdim olundu. Əla!",
    "status": "resolved",
    "original_text": "Çox sağ olun, operator Rauf bəy zəng zamanı itmiş nömrəmi tez bərpa etdi və yeni SIM kart təqdim olundu. Əla!",
    "redacted_text": "Çox sağ olun, operator Rauf bəy zəng zamanı itmiş nömrəmi tez bərpa etdi və yeni SIM kart təqdim olundu. Əla!",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1044",
    "timestamp": "2026-10-04T15:30:00Z",
    "channel": "Chat",
    "language": "ru",
    "customer_id": "CUST-9054",
    "text": "Отличная работа службы поддержки в чате! За 2 минуты переподключили пакет и вернули ошибочно списанный 1 манат.",
    "status": "resolved",
    "original_text": "Отличная работа службы поддержки в чате! За 2 минуты переподключили пакет и вернули ошибочно списанный 1 манат.",
    "redacted_text": "Отличная работа службы поддержки в чате! За 2 минуты переподключили пакет и вернули ошибочно списанный 1 манат.",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  },
  {
    "interaction_id": "INT-1045",
    "timestamp": "2026-10-04T16:15:00Z",
    "channel": "CRM Ticket",
    "language": "en",
    "customer_id": "CUST-9055",
    "text": "Quick and seamless eSIM profile re-issuance handled by the telecom helpdesk. Excellent experience.",
    "status": "resolved",
    "original_text": "Quick and seamless eSIM profile re-issuance handled by the telecom helpdesk. Excellent experience.",
    "redacted_text": "Quick and seamless eSIM profile re-issuance handled by the telecom helpdesk. Excellent experience.",
    "redactions_count": 0,
    "redactions": [],
    "analysis": {
      "sentiment": "positive",
      "topic": "Positive Support Feedback",
      "summary": "Customer expressed high satisfaction with prompt support assistance.",
      "urgency": "low",
      "suggested_owner": "Support",
      "repeat_contact_risk": "low",
      "confidence": 0.94,
      "model_used": "rules-based",
      "inference_type": "rules-based",
      "fallback_reason": "Rules-based demo fallback"
    }
  }
];
export const seedClusters = [
  {
    "topic": "Unexpected Data Charges",
    "volume": 11,
    "negative_count": 11,
    "negative_rate": 1,
    "affected_channels": [
      "Call Centre",
      "Chat",
      "CRM Ticket",
      "Review"
    ],
    "urgency": "high",
    "repeat_contact_risk": "high",
    "suggested_owner": "Billing",
    "sample_evidence": [
      {
        "interaction_id": "INT-1001",
        "channel": "Call Centre",
        "language": "az",
        "text": "Salam, bu gün balansdan səbəbsiz 8 AZN çıxıldı. Nömrəm [REDACTED_PHONE], hesab kodum [REDACTED_ACCOUNT_ID]. Xahiş edirəm pulu qaytarın.",
        "summary": "Customer reports unexpected deductions or disputed data charges."
      },
      {
        "interaction_id": "INT-1002",
        "channel": "Chat",
        "language": "ru",
        "text": "Здравствуйте! С моей карты [REDACTED_CARD] списали 15 манат за интернет, хотя у меня активен безлимитный пакет. Мой номер [REDACTED_PHONE].",
        "summary": "Customer reports unexpected deductions or disputed data charges."
      },
      {
        "interaction_id": "INT-1003",
        "channel": "CRM Ticket",
        "language": "en",
        "text": "I was charged $24 for unexpected background data roaming. My customer account is [REDACTED_ACCOUNT_ID] and contact email is [REDACTED_EMAIL]. Please refund.",
        "summary": "Customer reports unexpected deductions or disputed data charges."
      }
    ],
    "priority_score": 100,
    "priority_formula": "Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100",
    "priority_breakdown": {
      "volume": {
        "raw": 11,
        "normalized": 1,
        "weight": 0.3,
        "contribution": 30
      },
      "negative_rate": {
        "raw": 1,
        "weight": 0.25,
        "contribution": 25
      },
      "urgency": {
        "level": "high",
        "weight": 1,
        "factor_weight": 0.25,
        "contribution": 25
      },
      "repeat_contact_risk": {
        "level": "high",
        "weight": 1,
        "factor_weight": 0.2,
        "contribution": 20
      }
    },
    "interaction_ids": [
      "INT-1001",
      "INT-1002",
      "INT-1003",
      "INT-1016",
      "INT-1017",
      "INT-1018",
      "INT-1031",
      "INT-1032",
      "INT-1033",
      "INT-1040",
      "INT-1042"
    ]
  },
  {
    "topic": "SIM Card & OTP Issues",
    "volume": 10,
    "negative_count": 10,
    "negative_rate": 1,
    "affected_channels": [
      "Call Centre",
      "Chat",
      "CRM Ticket"
    ],
    "urgency": "high",
    "repeat_contact_risk": "high",
    "suggested_owner": "Support",
    "sample_evidence": [
      {
        "interaction_id": "INT-1007",
        "channel": "Call Centre",
        "language": "az",
        "text": "Yeni SIM karta keçəndən sonra bankdan təsdiq OTP SMS-ləri gəlmir. Şəxsi kabinet ID: [REDACTED_ACCOUNT_ID], telefon [REDACTED_PHONE].",
        "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue."
      },
      {
        "interaction_id": "INT-1008",
        "channel": "Chat",
        "language": "ru",
        "text": "После замены сим-карты не приходят смс с кодами авторизации от банка. Мой номер [REDACTED_PHONE], аккаунт [REDACTED_ACCOUNT_ID].",
        "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue."
      },
      {
        "interaction_id": "INT-1009",
        "channel": "CRM Ticket",
        "language": "en",
        "text": "Unable to receive two-factor authentication OTP SMS after eSIM transfer. Phone is [REDACTED_PHONE], account [REDACTED_ACCOUNT_ID].",
        "summary": "Failure delivering SMS OTP authentication codes or SIM provisioning issue."
      }
    ],
    "priority_score": 97.3,
    "priority_formula": "Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100",
    "priority_breakdown": {
      "volume": {
        "raw": 10,
        "normalized": 0.91,
        "weight": 0.3,
        "contribution": 27.3
      },
      "negative_rate": {
        "raw": 1,
        "weight": 0.25,
        "contribution": 25
      },
      "urgency": {
        "level": "high",
        "weight": 1,
        "factor_weight": 0.25,
        "contribution": 25
      },
      "repeat_contact_risk": {
        "level": "high",
        "weight": 1,
        "factor_weight": 0.2,
        "contribution": 20
      }
    },
    "interaction_ids": [
      "INT-1007",
      "INT-1008",
      "INT-1009",
      "INT-1022",
      "INT-1023",
      "INT-1024",
      "INT-1026",
      "INT-1037",
      "INT-1038",
      "INT-1039"
    ]
  },
  {
    "topic": "Network Slowdown & Coverage",
    "volume": 9,
    "negative_count": 9,
    "negative_rate": 1,
    "affected_channels": [
      "Call Centre",
      "Chat",
      "CRM Ticket"
    ],
    "urgency": "medium",
    "repeat_contact_risk": "medium",
    "suggested_owner": "Network",
    "sample_evidence": [
      {
        "interaction_id": "INT-1004",
        "channel": "Call Centre",
        "language": "az",
        "text": "Xırdalan ərazisində 4G internet çox zəif işləyir, sürət 1 Mbps-ə çatmır. Əlaqə üçün [REDACTED_PHONE] nömrəsinə zəng edin.",
        "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops."
      },
      {
        "interaction_id": "INT-1005",
        "channel": "Chat",
        "language": "ru",
        "text": "В районе метро Сахил постоянно пропадает 4G, страницы не открываются. Проверьте вышку связи, аккаунт [REDACTED_ACCOUNT_ID].",
        "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops."
      },
      {
        "interaction_id": "INT-1006",
        "channel": "CRM Ticket",
        "language": "en",
        "text": "Constant network timeouts and packet loss in downtown business district. Mobile connection keeps dropping. My email is [REDACTED_EMAIL].",
        "summary": "Degraded mobile network coverage, slow data speeds, or recurrent drops."
      }
    ],
    "priority_score": 74.5,
    "priority_formula": "Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100",
    "priority_breakdown": {
      "volume": {
        "raw": 9,
        "normalized": 0.82,
        "weight": 0.3,
        "contribution": 24.5
      },
      "negative_rate": {
        "raw": 1,
        "weight": 0.25,
        "contribution": 25
      },
      "urgency": {
        "level": "medium",
        "weight": 0.6,
        "factor_weight": 0.25,
        "contribution": 15
      },
      "repeat_contact_risk": {
        "level": "medium",
        "weight": 0.5,
        "factor_weight": 0.2,
        "contribution": 10
      }
    },
    "interaction_ids": [
      "INT-1004",
      "INT-1005",
      "INT-1006",
      "INT-1019",
      "INT-1020",
      "INT-1021",
      "INT-1034",
      "INT-1035",
      "INT-1036"
    ]
  },
  {
    "topic": "Mobile App Login & Crash",
    "volume": 6,
    "negative_count": 6,
    "negative_rate": 1,
    "affected_channels": [
      "Review",
      "Chat"
    ],
    "urgency": "medium",
    "repeat_contact_risk": "medium",
    "suggested_owner": "Product",
    "sample_evidence": [
      {
        "interaction_id": "INT-1010",
        "channel": "Review",
        "language": "az",
        "text": "Mobil tətbiqə daxil olmaq olmur, barmaq izi ilə girişdə proqram çökür və bağlanır. Telefonum iPhone 14, istifadəçi email: [REDACTED_EMAIL].",
        "summary": "Mobile application crashes or authentication authentication failure prevents login."
      },
      {
        "interaction_id": "INT-1011",
        "channel": "Chat",
        "language": "ru",
        "text": "После последнего обновления приложение вылетает при переходе в раздел оплаты. Карта [REDACTED_CARD]. Почините!",
        "summary": "Mobile application crashes or authentication authentication failure prevents login."
      },
      {
        "interaction_id": "INT-1012",
        "channel": "Review",
        "language": "en",
        "text": "The mobile app keeps crashing immediately on the splash screen upon login. Cannot check bill balance. My email: [REDACTED_EMAIL].",
        "summary": "Mobile application crashes or authentication authentication failure prevents login."
      }
    ],
    "priority_score": 66.4,
    "priority_formula": "Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100",
    "priority_breakdown": {
      "volume": {
        "raw": 6,
        "normalized": 0.55,
        "weight": 0.3,
        "contribution": 16.4
      },
      "negative_rate": {
        "raw": 1,
        "weight": 0.25,
        "contribution": 25
      },
      "urgency": {
        "level": "medium",
        "weight": 0.6,
        "factor_weight": 0.25,
        "contribution": 15
      },
      "repeat_contact_risk": {
        "level": "medium",
        "weight": 0.5,
        "factor_weight": 0.2,
        "contribution": 10
      }
    },
    "interaction_ids": [
      "INT-1010",
      "INT-1011",
      "INT-1012",
      "INT-1025",
      "INT-1027",
      "INT-1041"
    ]
  },
  {
    "topic": "Positive Support Feedback",
    "volume": 9,
    "negative_count": 0,
    "negative_rate": 0,
    "affected_channels": [
      "Call Centre",
      "Chat",
      "Review",
      "CRM Ticket"
    ],
    "urgency": "low",
    "repeat_contact_risk": "low",
    "suggested_owner": "Support",
    "sample_evidence": [
      {
        "interaction_id": "INT-1013",
        "channel": "Call Centre",
        "language": "az",
        "text": "Dünən zəng mərkəzindən Fuad bəy məsələmi 5 dəqiqəyə həll etdi. Əla və operativ xidmətə görə minnətdaram! Nömrəm [REDACTED_PHONE].",
        "summary": "Customer expressed high satisfaction with prompt support assistance."
      },
      {
        "interaction_id": "INT-1014",
        "channel": "Chat",
        "language": "ru",
        "text": "Оператор Анна очень вежливо и быстро помогла подключить правильный роуминг-тариф. Отличная поддержка клиентов, спасибо!",
        "summary": "Customer expressed high satisfaction with prompt support assistance."
      },
      {
        "interaction_id": "INT-1015",
        "channel": "Review",
        "language": "en",
        "text": "Super quick and professional customer support from the call centre representative. Resolved my billing inquiry in minutes! Highly satisfied.",
        "summary": "Customer expressed high satisfaction with prompt support assistance."
      }
    ],
    "priority_score": 31.5,
    "priority_formula": "Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100",
    "priority_breakdown": {
      "volume": {
        "raw": 9,
        "normalized": 0.82,
        "weight": 0.3,
        "contribution": 24.5
      },
      "negative_rate": {
        "raw": 0,
        "weight": 0.25,
        "contribution": 0
      },
      "urgency": {
        "level": "low",
        "weight": 0.2,
        "factor_weight": 0.25,
        "contribution": 5
      },
      "repeat_contact_risk": {
        "level": "low",
        "weight": 0.1,
        "factor_weight": 0.2,
        "contribution": 2
      }
    },
    "interaction_ids": [
      "INT-1013",
      "INT-1014",
      "INT-1015",
      "INT-1028",
      "INT-1029",
      "INT-1030",
      "INT-1043",
      "INT-1044",
      "INT-1045"
    ]
  }
];
export const seedActions = [
  {
    "id": "ACT-004",
    "cluster_topic": "Unexpected Data Charges",
    "action_title": "Audit Billing charging engine and configure warning notifications",
    "owner": "Billing",
    "due_date": "2026-10-31",
    "status": "in_progress",
    "expected_success_metric": "Reduce repeat contact volume by 50%",
    "created_at": "2026-10-09T16:04:58.638Z",
    "updated_at": "2026-10-09T16:04:58.638Z"
  },
  {
    "id": "ACT-003",
    "cluster_topic": "Unexpected Data Charges",
    "action_title": "Implement Emergency Telecom Operator Hotfix",
    "owner": "Billing",
    "due_date": "2026-10-25",
    "status": "in_progress",
    "expected_success_metric": "Reduce repeat contact rate by 60%",
    "created_at": "2026-10-09T16:04:42.783Z",
    "updated_at": "2026-10-09T16:04:42.783Z"
  },
  {
    "id": "ACT-001",
    "cluster_topic": "Unexpected Data Charges",
    "action_title": "Audit & Patch Background Data Charging Engine & Auto-SMS Warning",
    "owner": "Billing",
    "due_date": "2026-10-15",
    "status": "in_progress",
    "expected_success_metric": "Drop repeat data charge complaints by 50%",
    "created_at": "2026-10-02T10:00:00Z",
    "updated_at": "2026-10-02T10:00:00Z"
  },
  {
    "id": "ACT-002",
    "cluster_topic": "SIM Card & OTP Issues",
    "action_title": "Update SMS gateway routing with fallback banking tier",
    "owner": "Support",
    "due_date": "2026-10-18",
    "status": "open",
    "expected_success_metric": "Achieve 99.8% OTP delivery within 30 seconds",
    "created_at": "2026-10-03T11:30:00Z",
    "updated_at": "2026-10-03T11:30:00Z"
  }
];
export const seedClosedLoop = {
  "is_synthetic_demo": true,
  "disclaimer": "SYNTHETIC DEMO DATASET: Demonstrates simulated before/after feedback loop; not real production customer data.",
  "cluster_topic": "Unexpected Data Charges",
  "action_applied": {
    "action_id": "ACT-001",
    "title": "Audit & Patch Background Data Charging Engine & Auto-SMS Warning",
    "owner": "Billing (Nigar Aliyeva)",
    "deployed_date": "2026-09-15",
    "target_metric": "Reduce repeat billing contacts by >50% within 4 weeks"
  },
  "baseline_vs_current": {
    "before_weekly_volume": 156,
    "after_weekly_volume": 18,
    "volume_reduction_pct": 88.5,
    "before_repeat_contact_rate": 51.2,
    "after_repeat_contact_rate": 8.5,
    "repeat_rate_reduction_pct": 83.4,
    "status": "Intervention Successful - Repeat contacts minimized"
  },
  "weekly_trend": [
    {
      "week": "W-2 (Pre)",
      "mentions": 142,
      "repeat_contact_pct": 48.5,
      "negative_rate_pct": 88,
      "stage": "before"
    },
    {
      "week": "W-1 (Pre)",
      "mentions": 156,
      "repeat_contact_pct": 51.2,
      "negative_rate_pct": 91,
      "stage": "before"
    },
    {
      "week": "W0 (Action)",
      "mentions": 110,
      "repeat_contact_pct": 39,
      "negative_rate_pct": 75,
      "stage": "intervention"
    },
    {
      "week": "W+1 (Post)",
      "mentions": 84,
      "repeat_contact_pct": 29.4,
      "negative_rate_pct": 62,
      "stage": "after"
    },
    {
      "week": "W+2 (Post)",
      "mentions": 42,
      "repeat_contact_pct": 18.1,
      "negative_rate_pct": 45,
      "stage": "after"
    },
    {
      "week": "W+3 (Post)",
      "mentions": 26,
      "repeat_contact_pct": 12,
      "negative_rate_pct": 31,
      "stage": "after"
    },
    {
      "week": "W+4 (Post)",
      "mentions": 18,
      "repeat_contact_pct": 8.5,
      "negative_rate_pct": 24,
      "stage": "after"
    }
  ]
};
export const seedStats = {
  "total_interactions": 45,
  "sentiment_counts": {
    "positive": 9,
    "neutral": 0,
    "negative": 36,
    "negative_percentage": 80
  },
  "top_negative_topic": "Unexpected Data Charges",
  "top_negative_score": 100,
  "active_actions_count": 4,
  "total_actions_count": 4,
  "total_pii_redacted": 57,
  "clusters_count": 5,
  "model_mode": "rules-based fallback"
};
