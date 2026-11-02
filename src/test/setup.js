import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom has no <dialog> modal support yet.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    if (!this.open) return;
    this.open = false;
    // Like browsers, fire 'close' asynchronously.
    setTimeout(() => this.dispatchEvent(new Event('close')));
  };
}

window.scrollTo = () => {};

afterEach(cleanup);
