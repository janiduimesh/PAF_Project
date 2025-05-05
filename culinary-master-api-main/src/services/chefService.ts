
import { ChefModel } from "../types/ChefModel";

const API_URL = "http://localhost:8083/api/v1/chefs";

export const getAllChefs = async (): Promise<ChefModel[]> => {
  const response = await fetch(`${API_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch chefs");
  }
  return await response.json();
};

export const getChefById = async (id: string): Promise<ChefModel> => {
  const response = await fetch(`${API_URL}/find/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch chef");
  }
  return await response.json();
};

export const createChef = async (chef: ChefModel): Promise<ChefModel> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chef),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create chef");
  }
  
  return await response.json();
};

export const updateChef = async (id: string, chef: ChefModel): Promise<ChefModel> => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chef),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update chef");
  }
  
  return await response.json();
};

export const deleteChef = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/remove/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete chef");
  }
};
