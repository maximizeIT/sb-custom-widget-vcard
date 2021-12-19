/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import ReactDOM from "react-dom";

import { BlockFactory, BlockDefinition, ExternalBlockDefinition, BaseBlock } from "widget-sdk";
import { CustomWidgetUserVcardProps, CustomWidgetUserVcard } from "./custom-widget-user-vcard";
import { configurationSchema, uiSchema } from "./configuration-schema";
import pkg from '../package.json'

/**
 * This factory creates the class which is registered with the tagname in the `custom element registry`
 * Gets the parental class and a set of helper utilities provided by the hosting application.
 */
const factory: BlockFactory = (BaseBlockClass, WidgetApi) => {
  /**
   *  <custom-widget-user-vcard></custom-widget-user-vcard>
   */
  return class CustomWidgetUserVcardBlock extends BaseBlockClass implements BaseBlock {
    public constructor() {
      super();
    }

    private get props(): CustomWidgetUserVcardProps {
      const attrs = this.parseAttributes<CustomWidgetUserVcardProps>();
      return {
        ...attrs,
      };
    }

    public renderBlock(container: HTMLElement): void {
      ReactDOM.render(<CustomWidgetUserVcard {...this.props} widgetApi={WidgetApi} />, container);
    }

    /**
     * The observed attributes, where the widgets reacts on. The default
     * attributes "content-language", "widget-title", "on-card" have to be kept!
     */
    public static get observedAttributes(): string[] {
      const defaults = ["content-language", "widget-title", "on-card"];
      return [...defaults, "userid"];
    }

    /**
     * Callback invoked on every change of an observed attribute. Call the parental method before
     * applying own logic.
     */
    public attributeChangedCallback(...args: [string, string | undefined, string | undefined]): void {
      super.attributeChangedCallback.apply(this, args);
    }
  };
};

/**
 * The definition of the block, to let it successful register to the hosting application
 */
const blockDefinition: BlockDefinition = {
    name: "custom-widget-user-vcard",
    factory: factory,
    attributes: ['userid'],
    blockLevel: 'block',
    configurationSchema: configurationSchema,
    uiSchema: uiSchema,
    label: 'DEMO: vCard (QR Code)',
    iconUrl: "https://maximizeit.github.io/sb-custom-widget-vcard/resources/vcard-icon.png",
};

/**
 * Wrapping definition, which defines meta informations about the block.
 */
const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version
};

/**
 * This call is mandatory to register the block in the hosting application.
 */
window.defineBlock(externalBlockDefinition);
