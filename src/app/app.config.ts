import { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: '/assets/i18n/',
                suffix: '.json'
            }),
            fallbackLang: 'fr'
        })
    ]
};