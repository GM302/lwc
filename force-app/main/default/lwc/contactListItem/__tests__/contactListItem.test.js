import { createElement } from 'lwc';
import ContactListItem from 'c/contactListItem';

describe('c-contact-list-item', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows contact name and image based on public property', () => {
        const CONTACT = {
            Id: '0031700000pJRRSAA4',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
            Phone: '4152568563',
            Email: 'amy@demo.net',
            Picture__c:
                'https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg'
        };

        const element = createElement('c-contact-list-item', {
            is: ContactListItem
        });
        element.contact = CONTACT;
        document.body.appendChild(element);

        const imgEl = element.shadowRoot.querySelector('img');
        expect(imgEl.src).toBe(CONTACT.Picture__c);
        const nameEl = element.shadowRoot.querySelector('p');
        expect(nameEl.textContent).toBe(CONTACT.Name);
    });
});
