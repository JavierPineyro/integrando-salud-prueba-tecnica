import { $$ } from './utils.js';

export function loadViewTransition() {
    let allAnchors = $$("a");
    if (document.startViewTransition) {
        allAnchors.forEach(a => {
            a.addEventListener("click", e => {
                e.preventDefault();
                document.startViewTransition(() => {
                    window.location = a.href;
                });
            });
        });
    }
}