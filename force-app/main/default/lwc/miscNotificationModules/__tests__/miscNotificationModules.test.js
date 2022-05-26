import { createElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';

import MiscNotificationModules from 'c/miscNotificationModules';

describe('c-misc-notification-modules', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('shows an alert notification', async () => {
        // Create initial element
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });
        document.body.appendChild(element);

        LightningAlert.open = jest.fn().mockResolvedValue();

        // Select button for simulating user input
        const alertButton = element.shadowRoot.querySelector(
            'lightning-button.alertButton'
        );
        alertButton.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check if event has been fired
        expect(LightningAlert.open).toHaveBeenCalled();
        expect(LightningAlert.open.mock.calls).toHaveLength(1);
    });

    it('shows a confirm notification and text when ok', async () => {
        // Create initial element
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });
        document.body.appendChild(element);

        LightningConfirm.open = jest.fn().mockResolvedValue(true);

        // Select button for simulating user input
        const confirmButton = element.shadowRoot.querySelector(
            'lightning-button.confirmButton'
        );
        confirmButton.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Render cycle triggered by tracked value {result}
        await flushPromises();

        // Check if event has been fired
        const confirmResult =
            element.shadowRoot.querySelector('p.confirmResult');

        expect(LightningConfirm.open).toHaveBeenCalled();
        expect(LightningConfirm.open.mock.calls).toHaveLength(1);
        expect(confirmResult.textContent).toBe(
            'Confirm Status: Ok was clicked'
        );
    });

    it('shows a confirm notification and text when cancelled', async () => {
        // Create initial element
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });
        document.body.appendChild(element);

        LightningConfirm.open = jest.fn().mockResolvedValue(false);

        // Select button for simulating user input
        const confirmButton = element.shadowRoot.querySelector(
            'lightning-button.confirmButton'
        );
        confirmButton.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Render cycle triggered by tracked value {result}
        await flushPromises();

        // Check if event has been fired
        const confirmResult =
            element.shadowRoot.querySelector('p.confirmResult');

        expect(LightningConfirm.open).toHaveBeenCalled();
        expect(LightningConfirm.open.mock.calls).toHaveLength(1);
        expect(confirmResult.textContent).toBe(
            'Confirm Status: Cancel was clicked'
        );
    });

    it('shows a prompt notification and entered text', async () => {
        const PROMPT_VALUE = 'test value';

        // Create initial element
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });
        document.body.appendChild(element);

        LightningPrompt.open = jest.fn().mockResolvedValue(PROMPT_VALUE);

        // Select button for simulating user input
        const promptButton = element.shadowRoot.querySelector(
            'lightning-button.promptButton'
        );
        promptButton.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Render cycle triggered by tracked value {result}
        await flushPromises();

        // Check if event has been fired
        const promptResult = element.shadowRoot.querySelector('p.promptResult');

        expect(LightningPrompt.open).toHaveBeenCalled();
        expect(LightningPrompt.open.mock.calls).toHaveLength(1);
        expect(promptResult.textContent).toBe(
            'Entered value is: ' + PROMPT_VALUE
        );
    });

    it('shows a prompt notification and text when cancelled', async () => {
        // Create initial element
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });
        document.body.appendChild(element);

        LightningPrompt.open = jest.fn().mockResolvedValue(null);

        // Select button for simulating user input
        const promptButton = element.shadowRoot.querySelector(
            'lightning-button.promptButton'
        );
        promptButton.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Render cycle triggered by tracked value {result}
        await flushPromises();

        // Check if event has been fired
        const promptResult = element.shadowRoot.querySelector('p.promptResult');

        expect(LightningPrompt.open).toHaveBeenCalled();
        expect(LightningPrompt.open.mock.calls).toHaveLength(1);
        expect(promptResult.textContent).toBe('Entered value is: ');
    });

    it('is accessible', async () => {
        const element = createElement('c-misc-notification-modules', {
            is: MiscNotificationModules
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
