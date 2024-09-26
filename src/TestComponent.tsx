export function TestComponent(): void {
    // Create a container div
    const container = document.createElement('div');
    container.id = 'test-component';
    container.style.border = '2px solid #4CAF50';
    container.style.padding = '20px';
    container.style.margin = '20px';
    container.style.textAlign = 'center';
    container.style.backgroundColor = '#f9f9f9';

    // Create a heading element
    const heading = document.createElement('h1');
    heading.textContent = "Welcome to you're new project";
    heading.style.color = '#4CAF50';

    // Create a paragraph element
    const paragraph = document.createElement('p');
    paragraph.textContent = "This is a simple HTML component. To use React (or another library/framework), you'll need to install it and use JSX syntax. An example of a React component, alongside instructions for setting up a React project, can be found in src/ReactComponent.tsx.";
    paragraph.style.fontSize = '1.2em';

    // Append heading and paragraph to the container
    container.appendChild(heading);
    container.appendChild(paragraph);

    // Append the container to the body
    document.body.appendChild(container);
}
