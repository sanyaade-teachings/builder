import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type {
  BuilderBlock,
  BuilderContextInterface,
  RegisteredComponent,
  RegisteredComponents,
} from '@builder.io/sdk-angular';
import { Blocks } from '@builder.io/sdk-angular';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, Blocks],
  template: `
    <ng-container *ngIf="tabList?.length">
      <button
        *ngFor="let tab of tabList; let i = index"
        [class.active]="activeTab === i"
        (click)="activeTab = i"
      >
        {{ tab.tabName }}
      </button>

      <blocks
        [blocks]="tabList[activeTab].blocks"
        [path]="'tabList.' + activeTab + '.blocks'"
        [parent]="builderBlock.id"
        [context]="builderContext"
        [registeredComponents]="builderComponents"
      />
    </ng-container>
  `,
})
export class CustomTabsComponent {
  @Input() builderBlock!: BuilderBlock;
  @Input() tabList: { tabName: string; blocks: BuilderBlock[] }[] = [];
  @Input() builderComponents: RegisteredComponents = {};
  @Input() builderContext!: BuilderContextInterface;

  activeTab = 0;
}

export const customTabsInfo: RegisteredComponent = {
  component: CustomTabsComponent,
  name: 'TabFields',
  inputs: [
    {
      name: 'tabList',
      type: 'list',
      subFields: [
        {
          name: 'tabName',
          type: 'string',
        },
        {
          name: 'blocks',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
    },
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
};
