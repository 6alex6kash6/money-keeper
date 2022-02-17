import { Request, Response } from "express";
import { EntryServiceError } from "../types/errors.type";
import { EntryService } from "../services";

const entryService = new EntryService();
class EntryController {
  constructor() {}

  async addEntry(req: Request, res: Response) {
    try {
      const result = await entryService.add(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof EntryServiceError) {
        res.status(500);
      }
    }
  }

  async editEntry(req: Request, res: Response) {
    try {
      const result = await entryService.edit(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof EntryServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async getEntry(req: Request, res: Response) {
    try {
      const { budgetId } = req.body;
      const result = await entryService.get(budgetId);
      res.send(result);
    } catch (err) {
      if (err instanceof EntryServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async deleteEntry(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await entryService.delete(id);
      res.send(result);
    } catch (err) {
      if (err instanceof EntryServiceError) {
        res.send(err).status(500);
      }
    }
  }
}

export default EntryController;
