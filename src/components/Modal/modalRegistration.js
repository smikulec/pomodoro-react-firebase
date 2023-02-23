import { create as createModal } from '@ebay/nice-modal-react';

/**
 * Function used to register modal dialogs for usage inside the app. This function allows modal dialogs to be used with `useModalDialog` hook after they've been registered.
 */
export const registerModalDialog = createModal;
