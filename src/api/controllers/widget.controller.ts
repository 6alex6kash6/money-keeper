import { Request, Response } from "express";
import { WidgetServiceError } from "../types/errors.type";
import { WidgetService } from "../services";

const widgetService = new WidgetService();
class WidgetController {
  constructor() {}

  async addWidget(req: Request, res: Response) {
    try {
      const result = await widgetService.add(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof WidgetServiceError) {
        res.status(500);
      }
    }
  }

  async editWidget(req: Request, res: Response) {
    try {
      const result = await widgetService.edit(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof WidgetServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async getWidget(req: Request, res: Response) {
    try {
      const { budgetId } = req.body;
      const result = await widgetService.get(budgetId);
      res.send(result);
    } catch (err) {
      if (err instanceof WidgetServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async deleteWidget(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await widgetService.delete(id);
      res.send(result);
    } catch (err) {
      if (err instanceof WidgetServiceError) {
        res.send(err).status(500);
      }
    }
  }
}

export default WidgetController;
