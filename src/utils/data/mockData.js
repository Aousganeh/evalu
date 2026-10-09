// Mock data for the Evalu dashboard frontend

// Customer data
export const mockCustomerCount = 1247;

// Review counts
export const mockReviewCounts = {
  total: 892,
  negative: 134,
  positive: 678,
  solved: 456
};

// Most negative topic
export const mockMostNegativeTopic = "Product Quality Issues";

// Additional statistics for new cards
export const mockAdditionalStats = {
  customerSatisfaction: 87.3, // percentage
  averageResponseTime: "2.4h", // hours
  resolutionRate: 76.8, // percentage
  reviewResponseRate: 92.1, // percentage
  customerRetention: 84.7, // percentage
  mostCommonTopic: "Customer Service",
  activeUsersToday: 342,
  trendingTopics: ["Customer Service", "Product Quality", "Shipping", "Technical Support"]
};

// Reviews data
export const mockReviews = [
  {
    id: 1,
    content: "The product arrived damaged and customer service was unhelpful.",
    sentiment: 1, // 1 = negative, 2 = neutral, 3 = positive
    topic: "Shipping & Packaging",
    customer: {
      firstName: "Sarah",
      lastName: "Johnson"
    }
  },
  {
    id: 2,
    content: "Great customer service and fast delivery. Highly recommend!",
    sentiment: 3,
    topic: "Customer Service",
    customer: {
      firstName: "Michael",
      lastName: "Chen"
    }
  },
  {
    id: 3,
    content: "The item was okay but took longer than expected to arrive.",
    sentiment: 2,
    topic: "Delivery Time",
    customer: {
      firstName: "Emma",
      lastName: "Williams"
    }
  },
  {
    id: 4,
    content: "Poor product quality. Screen cracked after just one week of use.",
    sentiment: 1,
    topic: "Product Quality",
    customer: {
      firstName: "David",
      lastName: "Brown"
    }
  },
  {
    id: 5,
    content: "Excellent support team helped resolve my issue quickly.",
    sentiment: 3,
    topic: "Technical Support",
    customer: {
      firstName: "Lisa",
      lastName: "Garcia"
    }
  },
  {
    id: 6,
    content: "Website is confusing and checkout process is frustrating.",
    sentiment: 1,
    topic: "Website Usability",
    customer: {
      firstName: "James",
      lastName: "Miller"
    }
  },
  {
    id: 7,
    content: "Product works as advertised. Good value for money.",
    sentiment: 3,
    topic: "Product Performance",
    customer: {
      firstName: "Anna",
      lastName: "Davis"
    }
  },
  {
    id: 8,
    content: "Delivery was delayed by 2 weeks. Very disappointed.",
    sentiment: 1,
    topic: "Delivery Time",
    customer: {
      firstName: "Robert",
      lastName: "Wilson"
    }
  },
  {
    id: 9,
    content: "Amazing product! Exceeded my expectations.",
    sentiment: 3,
    topic: "Product Quality",
    customer: {
      firstName: "Maria",
      lastName: "Rodriguez"
    }
  },
  {
    id: 10,
    content: "Packaging was damaged but the product inside was fine.",
    sentiment: 2,
    topic: "Shipping & Packaging",
    customer: {
      firstName: "Kevin",
      lastName: "Martinez"
    }
  },
  {
    id: 11,
    content: "Support team was rude and unhelpful. Never buying again.",
    sentiment: 1,
    topic: "Customer Service",
    customer: {
      firstName: "Jennifer",
      lastName: "Anderson"
    }
  },
  {
    id: 12,
    content: "Fast shipping and excellent product quality. Will buy again!",
    sentiment: 3,
    topic: "Overall Experience",
    customer: {
      firstName: "Christopher",
      lastName: "Taylor"
    }
  }
];

// Monthly statistics data
export const mockMonthlyStats = [
  {
    month: 1, // January
    year: 2024,
    positiveCount: 45,
    negativeCount: 12,
    mostNegativeTopic: "Product Quality"
  },
  {
    month: 2, // February
    year: 2024,
    positiveCount: 52,
    negativeCount: 8,
    mostNegativeTopic: "Delivery Time"
  },
  {
    month: 3, // March
    year: 2024,
    positiveCount: 48,
    negativeCount: 15,
    mostNegativeTopic: "Customer Service"
  },
  {
    month: 4, // April
    year: 2024,
    positiveCount: 61,
    negativeCount: 11,
    mostNegativeTopic: "Shipping & Packaging"
  },
  {
    month: 5, // May
    year: 2024,
    positiveCount: 67,
    negativeCount: 9,
    mostNegativeTopic: "Website Usability"
  },
  {
    month: 6, // June
    year: 2024,
    positiveCount: 73,
    negativeCount: 14,
    mostNegativeTopic: "Product Quality"
  },
  {
    month: 7, // July
    year: 2024,
    positiveCount: 69,
    negativeCount: 16,
    mostNegativeTopic: "Delivery Time"
  },
  {
    month: 8, // August
    year: 2024,
    positiveCount: 78,
    negativeCount: 13,
    mostNegativeTopic: "Customer Service"
  },
  {
    month: 9, // September
    year: 2024,
    positiveCount: 82,
    negativeCount: 10,
    mostNegativeTopic: "Technical Support"
  },
  {
    month: 10, // October
    year: 2024,
    positiveCount: 89,
    negativeCount: 12,
    mostNegativeTopic: "Shipping & Packaging"
  },
  {
    month: 11, // November
    year: 2024,
    positiveCount: 95,
    negativeCount: 15,
    mostNegativeTopic: "Product Quality"
  },
  {
    month: 12, // December
    year: 2024,
    positiveCount: 102,
    negativeCount: 9,
    mostNegativeTopic: "Delivery Time"
  }
];

// Department names
export const mockDepartmentNames = [
  "Phone Customer Service",
  "Email Customer Service",
  "Chat Customer Service",
  "Watch Customer Service",
  "Technical Support",
  "Billing Department",
  "Returns & Exchanges",
  "Product Information",
  "Order Tracking",
  "General Inquiries"
];

// Department responsibilities mapping
export const departmentResponsibilities = {
  "Phone Customer Service": {
    responsibilities: [
      "Handle customer calls and inquiries",
      "Resolve product-related questions",
      "Process order modifications",
      "Assist with account issues",
      "Escalate complex problems"
    ],
    topics: ["Customer Service", "Product Questions", "Order Issues", "Account Support"],
    avgResponseTime: "15 min",
    avgResolutionTime: "2.5 hours"
  },
  "Email Customer Service": {
    responsibilities: [
      "Respond to email inquiries",
      "Handle written complaints",
      "Process refund requests",
      "Provide detailed product information",
      "Follow up on customer issues"
    ],
    topics: ["Email Support", "Complaints", "Refunds", "Product Information"],
    avgResponseTime: "4 hours",
    avgResolutionTime: "1.2 days"
  },
  "Chat Customer Service": {
    responsibilities: [
      "Real-time chat support",
      "Quick issue resolution",
      "Product recommendations",
      "Order assistance",
      "Technical troubleshooting"
    ],
    topics: ["Live Chat", "Quick Support", "Product Recommendations", "Technical Help"],
    avgResponseTime: "2 min",
    avgResolutionTime: "45 min"
  },
  "Watch Customer Service": {
    responsibilities: [
      "Watch product support",
      "Warranty claims",
      "Repair coordination",
      "Product replacement",
      "Technical specifications"
    ],
    topics: ["Watch Support", "Warranty", "Repairs", "Replacements"],
    avgResponseTime: "1 hour",
    avgResolutionTime: "3 days"
  },
  "Technical Support": {
    responsibilities: [
      "Technical troubleshooting",
      "Software installation help",
      "Hardware diagnostics",
      "Bug reporting and tracking",
      "Product compatibility issues"
    ],
    topics: ["Technical Issues", "Software", "Hardware", "Compatibility"],
    avgResponseTime: "30 min",
    avgResolutionTime: "4 hours"
  },
  "Billing Department": {
    responsibilities: [
      "Payment processing",
      "Invoice management",
      "Billing disputes",
      "Subscription management",
      "Payment method updates"
    ],
    topics: ["Billing", "Payments", "Invoices", "Subscriptions"],
    avgResponseTime: "2 hours",
    avgResolutionTime: "1 day"
  },
  "Returns & Exchanges": {
    responsibilities: [
      "Process return requests",
      "Handle exchange requests",
      "Refund processing",
      "Return authorization",
      "Shipping label generation"
    ],
    topics: ["Returns", "Exchanges", "Refunds", "Shipping"],
    avgResponseTime: "6 hours",
    avgResolutionTime: "2 days"
  },
  "Product Information": {
    responsibilities: [
      "Product specifications",
      "Feature explanations",
      "Comparison assistance",
      "Availability information",
      "Product recommendations"
    ],
    topics: ["Product Info", "Specifications", "Features", "Availability"],
    avgResponseTime: "1 hour",
    avgResolutionTime: "30 min"
  },
  "Order Tracking": {
    responsibilities: [
      "Order status updates",
      "Shipping information",
      "Delivery tracking",
      "Delivery issues",
      "Carrier coordination"
    ],
    topics: ["Order Status", "Shipping", "Delivery", "Tracking"],
    avgResponseTime: "30 min",
    avgResolutionTime: "1 day"
  },
  "General Inquiries": {
    responsibilities: [
      "General questions",
      "Company information",
      "Policy explanations",
      "Partnership inquiries",
      "Feedback collection"
    ],
    topics: ["General Questions", "Company Info", "Policies", "Partnerships"],
    avgResponseTime: "2 hours",
    avgResolutionTime: "1 day"
  }
};

// Users data
export const mockUsers = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15T10:30:00Z",
    lastActive: "2024-12-10T14:22:00Z",
    status: "active",
    segment: "VIP",
    totalOrders: 24,
    totalSpent: 2847.50,
    reviewsCount: 3,
    avgRating: 4.2,
    location: "New York, NY",
    tags: ["High Value", "Frequent Buyer"],
    activity: [
      { type: "order", description: "Placed order #1234", date: "2024-12-10T14:22:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-05T09:15:00Z" },
      { type: "login", description: "Logged in", date: "2024-12-08T16:45:00Z" }
    ]
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-03-22T08:15:00Z",
    lastActive: "2024-12-11T11:30:00Z",
    status: "active",
    segment: "Regular",
    totalOrders: 12,
    totalSpent: 1245.80,
    reviewsCount: 5,
    avgRating: 4.8,
    location: "San Francisco, CA",
    tags: ["Loyal Customer"],
    activity: [
      { type: "review", description: "Left a positive review", date: "2024-12-11T11:30:00Z" },
      { type: "order", description: "Placed order #1235", date: "2024-12-09T13:20:00Z" }
    ]
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "Williams",
    email: "emma.williams@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-06-10T12:00:00Z",
    lastActive: "2024-11-28T15:10:00Z",
    status: "inactive",
    segment: "Regular",
    totalOrders: 8,
    totalSpent: 678.90,
    reviewsCount: 2,
    avgRating: 3.5,
    location: "Chicago, IL",
    tags: [],
    activity: [
      { type: "order", description: "Placed order #1236", date: "2024-11-28T15:10:00Z" }
    ]
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2022-11-05T09:45:00Z",
    lastActive: "2024-12-09T10:20:00Z",
    status: "active",
    segment: "VIP",
    totalOrders: 45,
    totalSpent: 5678.20,
    reviewsCount: 8,
    avgRating: 4.5,
    location: "Los Angeles, CA",
    tags: ["High Value", "VIP", "Early Adopter"],
    activity: [
      { type: "order", description: "Placed order #1237", date: "2024-12-09T10:20:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-07T14:30:00Z" },
      { type: "login", description: "Logged in", date: "2024-12-09T10:15:00Z" }
    ]
  },
  {
    id: 5,
    firstName: "Lisa",
    lastName: "Garcia",
    email: "lisa.garcia@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-08-18T14:20:00Z",
    lastActive: "2024-12-11T09:45:00Z",
    status: "active",
    segment: "Regular",
    totalOrders: 15,
    totalSpent: 1890.30,
    reviewsCount: 4,
    avgRating: 4.6,
    location: "Miami, FL",
    tags: ["Loyal Customer"],
    activity: [
      { type: "login", description: "Logged in", date: "2024-12-11T09:45:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-08T11:20:00Z" }
    ]
  },
  {
    id: 6,
    firstName: "James",
    lastName: "Miller",
    email: "james.miller@email.com",
    phone: "+1 (555) 678-9012",
    joinDate: "2023-02-14T11:30:00Z",
    lastActive: "2024-10-15T16:20:00Z",
    status: "inactive",
    segment: "At Risk",
    totalOrders: 3,
    totalSpent: 234.50,
    reviewsCount: 1,
    avgRating: 2.0,
    location: "Seattle, WA",
    tags: ["At Risk"],
    activity: [
      { type: "order", description: "Placed order #1238", date: "2024-10-15T16:20:00Z" }
    ]
  },
  {
    id: 7,
    firstName: "Anna",
    lastName: "Davis",
    email: "anna.davis@email.com",
    phone: "+1 (555) 789-0123",
    joinDate: "2023-05-20T13:15:00Z",
    lastActive: "2024-12-10T12:00:00Z",
    status: "active",
    segment: "Regular",
    totalOrders: 18,
    totalSpent: 2134.60,
    reviewsCount: 6,
    avgRating: 4.3,
    location: "Boston, MA",
    tags: ["Frequent Buyer"],
    activity: [
      { type: "order", description: "Placed order #1239", date: "2024-12-10T12:00:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-06T10:30:00Z" }
    ]
  },
  {
    id: 8,
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 890-1234",
    joinDate: "2022-09-12T10:00:00Z",
    lastActive: "2024-12-11T08:30:00Z",
    status: "active",
    segment: "VIP",
    totalOrders: 52,
    totalSpent: 7890.40,
    reviewsCount: 12,
    avgRating: 4.7,
    location: "Austin, TX",
    tags: ["High Value", "VIP", "Brand Ambassador"],
    activity: [
      { type: "login", description: "Logged in", date: "2024-12-11T08:30:00Z" },
      { type: "order", description: "Placed order #1240", date: "2024-12-08T15:45:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-05T09:20:00Z" }
    ]
  },
  {
    id: 9,
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1 (555) 901-2345",
    joinDate: "2023-07-25T09:20:00Z",
    lastActive: "2024-12-09T14:15:00Z",
    status: "active",
    segment: "Regular",
    totalOrders: 9,
    totalSpent: 567.80,
    reviewsCount: 3,
    avgRating: 4.5,
    location: "Phoenix, AZ",
    tags: [],
    activity: [
      { type: "order", description: "Placed order #1241", date: "2024-12-09T14:15:00Z" }
    ]
  },
  {
    id: 10,
    firstName: "Kevin",
    lastName: "Martinez",
    email: "kevin.martinez@email.com",
    phone: "+1 (555) 012-3456",
    joinDate: "2023-04-08T16:30:00Z",
    lastActive: "2024-11-20T11:00:00Z",
    status: "inactive",
    segment: "At Risk",
    totalOrders: 5,
    totalSpent: 345.20,
    reviewsCount: 1,
    avgRating: 3.0,
    location: "Denver, CO",
    tags: ["At Risk"],
    activity: [
      { type: "order", description: "Placed order #1242", date: "2024-11-20T11:00:00Z" }
    ]
  },
  {
    id: 11,
    firstName: "Jennifer",
    lastName: "Anderson",
    email: "jennifer.anderson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-09-30T12:45:00Z",
    lastActive: "2024-12-10T13:30:00Z",
    status: "active",
    segment: "Regular",
    totalOrders: 11,
    totalSpent: 1234.90,
    reviewsCount: 2,
    avgRating: 3.5,
    location: "Portland, OR",
    tags: [],
    activity: [
      { type: "login", description: "Logged in", date: "2024-12-10T13:30:00Z" },
      { type: "review", description: "Left a review", date: "2024-12-04T10:15:00Z" }
    ]
  },
  {
    id: 12,
    firstName: "Christopher",
    lastName: "Taylor",
    email: "christopher.taylor@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2022-12-01T08:00:00Z",
    lastActive: "2024-12-11T10:00:00Z",
    status: "active",
    segment: "VIP",
    totalOrders: 38,
    totalSpent: 4567.30,
    reviewsCount: 9,
    avgRating: 4.6,
    location: "Nashville, TN",
    tags: ["High Value", "VIP"],
    activity: [
      { type: "order", description: "Placed order #1243", date: "2024-12-11T10:00:00Z" },
      { type: "login", description: "Logged in", date: "2024-12-11T09:50:00Z" }
    ]
  }
];

// Simulated API delay for realistic loading experience
export const simulateApiDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API functions that simulate real API responses
export const mockApi = {
  // Customer count
  getCustomerCount: async () => {
    await simulateApiDelay(800);
    return mockCustomerCount.toString();
  },

  // Review counts
  getReviewCount: async () => {
    await simulateApiDelay(600);
    return mockReviewCounts.total.toString();
  },

  getNegativeReviewCount: async () => {
    await simulateApiDelay(700);
    return mockReviewCounts.negative.toString();
  },

  getPositiveReviewCount: async () => {
    await simulateApiDelay(650);
    return mockReviewCounts.positive.toString();
  },

  getSolvedReviewCount: async () => {
    await simulateApiDelay(750);
    return mockReviewCounts.solved.toString();
  },

  // Most negative topic
  getMostNegativeTopic: async () => {
    await simulateApiDelay(900);
    return mockMostNegativeTopic;
  },

  // Reviews list
  getReviews: async () => {
    await simulateApiDelay(1200);
    return mockReviews;
  },

  // Monthly stats
  getMonthlyStats: async () => {
    await simulateApiDelay(1000);
    return mockMonthlyStats;
  },

  // Department names
  getDepartmentNames: async () => {
    await simulateApiDelay(800);
    return JSON.stringify(mockDepartmentNames);
  },

  // Users list
  getUsers: async () => {
    await simulateApiDelay(1000);
    return mockUsers;
  },

  // User by ID
  getUserById: async (id) => {
    await simulateApiDelay(600);
    return mockUsers.find(user => user.id === id) || null;
  }
};
