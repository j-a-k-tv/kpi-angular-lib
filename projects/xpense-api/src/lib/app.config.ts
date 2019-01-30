import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<IAppConfig>("app.config");

export interface IAppConfig {
    apiEndpoint: string;
    categoriesApi: string;
    expensesApi: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: "https://gentle-shelf-74899.herokuapp.com/api/",
    categoriesApi: "categories/",
    expensesApi: "items/"
};