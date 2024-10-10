import {
  BusinessT,
  UpdateDirectorDetailsT,
  UpdatePersonalDetailsT,
} from '@/types';
import {create} from 'zustand';

interface BusinessState {
  business: BusinessT | null;
  setBusiness: (business: BusinessT | null) => void;
  personalDetails: UpdatePersonalDetailsT | null;
  directorsDetails: UpdateDirectorDetailsT[];
  setPersonalDetails: (payload: UpdatePersonalDetailsT) => void;
  setDirectorDetails: (payload: UpdateDirectorDetailsT[]) => void;
}

const savedBusiness: string | null = localStorage.getItem('business');
const business: BusinessT | null = savedBusiness
  ? JSON.parse(savedBusiness)
  : null;

export const useBusiness = create<BusinessState>(set => ({
  business,
  personalDetails: null,
  businessDetails: null,
  directorsDetails: [],

  setBusiness(business) {
    set({business});
  },

  setPersonalDetails(payload) {
    set({personalDetails: payload});
  },

  // Update directors' details at specific index
  setDirectorDetails(payload) {
    set({directorsDetails: payload});
  },
}));
