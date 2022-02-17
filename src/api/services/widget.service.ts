import { Widget, WidgetDocument } from "../models";
import DataService from "./DataAccess.service";
import { WidgetServiceError } from "../types/errors.type";

const dataService = new DataService(Widget);

interface IWidgetService {
  add({
    name,
    widgetType,
    widgetWidth,
    dateRange,
  }: {
    name: string;
    widgetType: number;
    widgetWidth: number;
    dateRange: { from: string; to: string };
  }): Promise<WidgetDocument | WidgetServiceError>;
  edit({
    widgetId,
    updates,
  }: {
    widgetId: string;
    updates: object;
  }): Promise<WidgetDocument | WidgetServiceError>;
  get(budgetId: string): Promise<WidgetDocument[] | WidgetServiceError>;
  delete(widgetId: string): Promise<void | WidgetServiceError>;
}
class WidgetService implements IWidgetService {
  async add({
    name,
    widgetType,
    widgetWidth,
    dateRange,
  }): Promise<WidgetDocument | WidgetServiceError> {
    try {
      const widget = await dataService.create({
        name,
        widgetType,
        widgetWidth,
        dateRange,
      });
      return widget;
    } catch (error) {
      if (error) {
        return new WidgetServiceError(error.message);
      }
    }
  }

  async edit({
    widgetId,
    ...updates
  }): Promise<WidgetDocument | WidgetServiceError> {
    try {
      const widget = await dataService.update(widgetId, { ...updates });
      return widget;
    } catch (error) {
      if (error) {
        return new WidgetServiceError(error.message);
      }
    }
  }

  async get(budgetId): Promise<WidgetDocument[] | WidgetServiceError> {
    try {
      const widget = await dataService.get({ budget: budgetId });
      return widget;
    } catch (error) {
      if (error) {
        return new WidgetServiceError(error.message);
      }
    }
  }

  async delete(widgetId) {
    try {
      const deletedBudget = dataService.delete({ _id: widgetId });
    } catch (error) {
      if (error) {
        return new WidgetServiceError(error.message);
      }
    }
  }
}

export default WidgetService;
