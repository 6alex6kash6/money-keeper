import {Entry, EntryDocument} from "../models";
import DataService from "./DataAccess.service";
import {EntryServiceError} from "../types/errors.type";

const dataService = new DataService(Entry);

interface IEntryService {
    add({
            name,
            entryType,
            category,
            value,
            date,
            budgetId,
        }: {
        name: string;
        entryType: number;
        category: number;
        value: number;
        date: string;
        budgetId: string;
    }): Promise<EntryDocument | EntryServiceError>;

    edit({
             entryId,
             updates,
         }: {
        entryId: string;
        updates: object;
    }): Promise<EntryDocument | EntryServiceError>;

    get(budgetId: string): Promise<EntryDocument[] | EntryServiceError>;

    delete(entryId: string): Promise<void | EntryServiceError>;
}

class EntryService implements IEntryService {
    async add({
                  name,
                  entryType,
                  category,
                  value,
                  date,
                  budgetId,
              }): Promise<EntryDocument | EntryServiceError> {
        try {
            const entry = await dataService.create({
                name,
                entryType,
                category,
                value,
                date,
                budgetId,
            });
            return entry;
        } catch (error) {
            if (error) {
                return new EntryServiceError(error.message);
            }
        }
    }

    async edit({
                   entryId,
                   ...updates
               }): Promise<EntryDocument | EntryServiceError> {
        try {
            const entry = await dataService.update(entryId, {...updates});
            return entry;
        } catch (error) {
            if (error) {
                return new EntryServiceError(error.message);
            }
        }
    }

    async get(budgetId): Promise<EntryDocument[] | EntryServiceError> {
        try {
            const entries = await dataService.get({budget: budgetId});
            return entries;
        } catch (error) {
            if (error) {
                return new EntryServiceError(error.message);
            }
        }
    }

    async delete(entryId) {
        try {
            const deletedEntry = dataService.delete({_id: entryId});
        } catch (error) {
            if (error) {
                return new EntryServiceError(error.message);
            }
        }
    }
}

export default EntryService;
