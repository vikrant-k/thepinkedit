/**
 * Get Notified form → sends responses to the Google Form.
 *
 * Entry IDs below are linked to the live Google Form (see README if the form's questions change).
 * Get them from Google Forms: ⋮ menu → "Get pre-filled link" → fill every answer →
 * "Get link" → the link contains entry.123456789=… for each question.
 */
const NOTIFY_FORM_CONFIG = {
    formId: '1FAIpQLSf6hh8w1TEEyVzm4fprW8r7gPs3QWSlclRMgjNfu2hNSsw5kA',
    entries: {
        products: 'entry.578316818', // Q1 – Which all products are you interested in?
        name:     'entry.691520106', // Q2 – Please enter your name.
        email:    'entry.1883392205'  // Q3 – Email address (required)
    }
};

(function () {
    const form = document.getElementById('notify-form');
    if (!form) return;

    // ----- Dropdown with checkboxes -----
    const select = document.getElementById('product-select');
    const toggle = select.querySelector('.ms-toggle');
    const panel = select.querySelector('.ms-panel');
    const summary = select.querySelector('.ms-summary');
    const boxes = [...select.querySelectorAll('input[type="checkbox"]')];

    const setOpen = (open) => {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        select.classList.toggle('open', open);
    };
    const updateSummary = () => {
        const chosen = boxes.filter(b => b.checked).map(b => b.value);
        summary.textContent = chosen.length === 0 ? 'Select products'
            : chosen.length <= 2 ? chosen.join(', ')
            : `${chosen.length} products selected`;
        summary.classList.toggle('has-value', chosen.length > 0);
    };

    toggle.addEventListener('click', () => setOpen(panel.hidden));
    boxes.forEach(b => b.addEventListener('change', updateSummary));
    document.addEventListener('click', (e) => { if (!select.contains(e.target)) setOpen(false); });
    select.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setOpen(false); toggle.focus(); } });

    // ----- Submit -----
    const email = document.getElementById('notify-email');
    const emailError = document.getElementById('email-error');
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.form-submit');
    const configured = Object.values(NOTIFY_FORM_CONFIG.entries).every(id => /^entry\.\d+$/.test(id));

    const showStatus = (msg, isError) => {
        status.textContent = msg;
        status.hidden = false;
        status.classList.toggle('is-error', !!isError);
    };

    email.addEventListener('input', () => { emailError.hidden = true; email.classList.remove('invalid'); });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.hidden = true;

        if (!email.value.trim() || !email.checkValidity()) {
            emailError.hidden = false;
            email.classList.add('invalid');
            email.focus();
            return;
        }

        if (!configured) {
            console.warn('Notify form: entry IDs are not set in assets/js/notify-form.js');
            showStatus('Sorry, sign-ups are not open just yet. Please email us at thepinkeditca@gmail.com.', true);
            return;
        }

        const { entries, formId } = NOTIFY_FORM_CONFIG;
        const data = new URLSearchParams();
        boxes.filter(b => b.checked).forEach(b => data.append(entries.products, b.value));
        data.append(entries.name, document.getElementById('notify-name').value.trim());
        data.append(entries.email, email.value.trim());

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
        try {
            // Google Forms doesn't return a readable response cross-site, so "no-cors" is expected.
            await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });
            form.reset();
            updateSummary();
            showStatus("Thank you! We'll let you know as soon as our products are available.");
        } catch (err) {
            showStatus('Something went wrong. Please try again, or email us at thepinkeditca@gmail.com.', true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });
})();
