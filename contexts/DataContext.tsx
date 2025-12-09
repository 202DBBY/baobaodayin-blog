import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, LocationLog, Friend, Moment, Comment, UserProfile } from '../types';
import { MOCK_POSTS, MOCK_FOOTPRINTS, MOCK_FRIENDS, MOCK_MOMENTS, DEFAULT_PROFILE } from '../constants';

interface DataContextType {
  posts: Post[];
  footprints: LocationLog[];
  friends: Friend[];
  moments: Moment[];
  profile: UserProfile;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  addFootprint: (log: LocationLog) => void;
  addMoment: (moment: Moment) => void;
  likeMoment: (id: string) => void;
  addComment: (momentId: string, comment: Comment) => void;
  deleteComment: (momentId: string, commentId: string) => void;
  addFriend: (friend: Friend) => void;
  approveFriend: (id: string) => void;
  deleteFriend: (id: string) => void;
  updateProfile: (profile: UserProfile) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [footprints, setFootprints] = useState<LocationLog[]>(MOCK_FOOTPRINTS);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [moments, setMoments] = useState<Moment[]>(MOCK_MOMENTS);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const addFootprint = (log: LocationLog) => {
    setFootprints(prev => [log, ...prev]);
  };

  const addMoment = (moment: Moment) => {
    setMoments(prev => [moment, ...prev]);
  };

  const likeMoment = (id: string) => {
    setMoments(prev => prev.map(m => {
      if (m.id === id) {
        const isLiked = !m.isLiked;
        return {
          ...m,
          isLiked,
          likes: isLiked ? m.likes + 1 : m.likes - 1
        };
      }
      return m;
    }));
  };

  const addComment = (momentId: string, comment: Comment) => {
    setMoments(prev => prev.map(m => {
      if (m.id === momentId) {
        return {
          ...m,
          comments: [comment, ...(m.comments || [])]
        };
      }
      return m;
    }));
  };

  const deleteComment = (momentId: string, commentId: string) => {
    setMoments(prev => prev.map(m => {
      if (m.id === momentId) {
        return {
          ...m,
          comments: (m.comments || []).filter(c => c.id !== commentId)
        };
      }
      return m;
    }));
  };

  const addFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
  };

  const approveFriend = (id: string) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status: 'active' } : f));
  };

  const deleteFriend = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <DataContext.Provider value={{ 
      posts, 
      footprints, 
      friends, 
      moments,
      profile,
      addPost, 
      updatePost, 
      deletePost,
      addFootprint,
      addMoment,
      likeMoment,
      addComment,
      deleteComment,
      addFriend,
      approveFriend,
      deleteFriend,
      updateProfile
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};