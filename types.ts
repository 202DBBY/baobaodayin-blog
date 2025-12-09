export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  content?: string; // Markdown or plain text
  tags: string[];
  category: string; // 'magic', 'log', 'recent'
  image?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

export interface Moment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  images?: string[];
  video?: string; // URL to video
  likes: number;
  isLiked?: boolean;
  comments?: Comment[];
}

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  children?: NavItem[];
  isOpen?: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  description: string;
  url: string;
  tags?: string[];
  email?: string;
  status: 'active' | 'pending';
}

export interface LocationLog {
  id: string;
  city: string;
  province: string;
  date: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 relative to map container
  articleId?: string; // Linked article ID
}

export interface Interest {
  name: string;
  percent: number; // 0-100
  color: string; // tailwind color class e.g. 'bg-blue-500'
  icon: 'Code' | 'Music' | 'Coffee' | 'Camera' | 'Game';
}

export interface UserProfile {
  name: string;
  avatar: string;
  tagline: string; // e.g. 00后
  bio: string; // Short bio under name
  description: string; // Long Markdown description
  location: string;
  email: string;
  github: string;
  twitter: string;
  skills: string[];
  interests: Interest[];
  quote: string;
}