import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerEventTypes, TriggerTypes, TriggerContextData } from "deno-slack-api/mod.ts";

import { ExampleTicketWorkflow } from "./example_workflow.ts";

const createNewIssueShortcut: Trigger<
  typeof ExampleTicketWorkflow.definition
> = {
  type: TriggerTypes.Event,
  name: "Reactji trigger",
  description: "responds to a specific reactji",
  workflow: `#/workflows/${ExampleTicketWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.ReactionAdded,
    all_resources: true,
    filter: {
      version: 1,
      root: {
        statement: "{{data.reaction}} == asana"
      }
    }
  },
  inputs: {
    reacting_user_id: {
      value: TriggerContextData.Event.ReactionAdded.user_id,
    },
    message_context: {
      value: TriggerContextData.Event.ReactionAdded.message_context,
    },
    message_link: {
      value: TriggerContextData.Event.ReactionAdded.message_link,
    },
    parent_link: {
      value: TriggerContextData.Event.ReactionAdded.parent_message_link,
    },
  },
};

export default createNewIssueShortcut;