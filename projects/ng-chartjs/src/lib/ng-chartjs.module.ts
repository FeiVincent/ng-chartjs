import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgChartjsDirective } from './ng-chartjs.directive';
import { NgChartjsDefaultPluginToken, NgChartjsCustomPluginToken } from './plugin-token';
import { PluginConfig } from './pluginsConfig';
import { NgChartjsService } from './ng-chartjs.service';


export function ngChartjsCustomPluginsFactory(plugins: any[]): PluginConfig {
  return new PluginConfig(plugins);
}

export function ngChartjsDefaultPluginsFactory(): PluginConfig {
  return new PluginConfig([]);
}


@NgModule({
  imports: [
  ],
  declarations: [NgChartjsDirective],
  exports: [NgChartjsDirective],
  providers: [
    {
      provide: NgChartjsCustomPluginToken,
      useFactory: ngChartjsDefaultPluginsFactory
    }
  ]
})
export class NgChartjsModule {
  /**
   * Register a plugin.
   * @param plugin
   */
  public static registerPlugin(plugins: any[] = []): ModuleWithProviders {
    return {
      ngModule: NgChartjsModule,
      providers: [
        {
          provide: NgChartjsDefaultPluginToken,
          useValue: plugins
        },
        {
          deps: [NgChartjsDefaultPluginToken],
          provide: NgChartjsCustomPluginToken,
          useFactory: ngChartjsCustomPluginsFactory
        }
      ]
    };
  }
}
