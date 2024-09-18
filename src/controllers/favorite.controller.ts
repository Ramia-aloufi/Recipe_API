import { Request, Response } from "express";
import {
  createOne,
  getById,
  updateOneById,
  getAll,
  deleteOneById,
} from "../repositories/favorite.repository";

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await createOne(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const favorite = await getById(req.params.id);
    if (favorite) {
      res.json(favorite);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await getAll();
    res.json(favorites);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await updateOneById(req.params.id, req.body);
    if (favorite) {
      res.json(favorite);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await deleteOneById(req.params.id);
    if (favorite) {
      res.json({ message: "Favorite deleted successfully" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
