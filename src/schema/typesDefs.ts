const typeDefs = `
enum UserStatus {
    ACTIVE
    INACTIVE
    BLOCKED
  }
  
  enum SwarmStatus {
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }
  
  enum NotificationStatus {
    READ
    UNREAD
  }
  
  enum SwarmResultsStatus {
    APPROVED
    REJECTED
    PENDING
  }
  
  enum SettingsStatus {
    ENABLED
    DISABLED
  }
  
  enum VisibilityStatus {
    PRIVATE
    PUBLIC
  }
  
  enum CategoryType {
    PUBLIC
    PRIVATE
  }

  scalar JSON
  scalar DateTime
  type Query {
    user(id: Int!): User
    swarms: [Swarm]
    swarm(id: Int!): Swarm
    notifications: [Notification]
    swarm_activities(swarm_id: Int!): [SwarmActivities]
    swarm_results(id: Int!): SwarmResults
    profile(id: Int!): Profile
    settings: Settings
    user_swarms(id: Int!): [Swarm]
    user_settings(profile_id: Int!): Settings
  }
  
  type Mutation {
    createSwarm(input: SwarmInput): Swarm 
    updateSwarm(id: Int!, input: SwarmInput!): Swarm
  }
  type User {
    id: Int!
    first_name: String!
    last_name: String!
    email: String!
    phone: String
    created_at: DateTime
    status: UserStatus
    profile: Profile
    swarms: [Swarm]
    notifications: [Notification]
  }
  
  type Profile {
    id: Int!
    profile_url: String
    notification_enabled: Boolean
    user: User!
    user_id: Int
    status: UserStatus
    created_at: DateTime
    settings: Settings
  }
  
  type Swarm {
    id: Int!
    title: String!
    category: String!
    description: String!
    user: User
    user_id: Int
    status: SwarmStatus
    mturk_enabled: Boolean
    visibility: String
    created_at: DateTime
    swarm_result: SwarmResults
    swarm_activities: [SwarmActivities]
  }
  
  type Notification {
    id: Int!
    title: String
    content: String
    created_at: DateTime
    status: NotificationStatus
    user: [User]
  }
  type SwarmResults {
    id: Int!
    swarm: Swarm
    swarm_id: Int!
    status: SwarmResultsStatus
    created_at: String
    mturk_hits_results: JSON
    swarm_ai_results: JSON
  }
  
  type Settings {
    id: Int!
    profile_id: Int!
    user: Profile
    status: SettingsStatus
    created_at: DateTime
    notification_settings: JSON
  }
  
  type SwarmActivities {
    id: Int!
    swarm_id: Int!
    swarm: Swarm
    created_at: DateTime
  }
  
  input SwarmInput {
    title: String
    category: String
    description: String
    user_id: Int
    status: SwarmStatus
    mturk_enabled: Boolean
    visibility: String
  }
`;

export default typeDefs;
