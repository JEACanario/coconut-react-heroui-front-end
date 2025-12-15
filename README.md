Single Page Application built with React 19, Vite, HeroUI component library and Tailwind.
The main goal was to explore the possibilities of modern web development and gain a sense for state management while creating a functional user interface.
Future developments could include AI Speech Recognition for note taking and Book Report Generation.
Currently deployed on GitHub Pages. Find it @ coconut.spot or https://www.coconut.spot
Please allow some time for the backend API to spin up if it's the first visit of the day - I'm using a free-tier Azure plan for hosting.


ToDo(s): 

Overall Beautification - development so far has been focused on functionality
Responsivenss - work on CSS to improve usability in smaller devices
AI features - experiment with voice recognition for entry generation, this would make the app more mobile friendly. AI generation of reports from entry 
Social Features - Allow sharing of Coconuts in Report mode or just read only mode so users can share experiences. This may require the coconut owner to be able to mark some entries as spoilers.
Lower depency on OpenLibAI - saving more information and covers in our own API

------------------ Framework output in case you wish to run this yourself-----------------------

# Vite & HeroUI Template

This is a template for creating applications using Vite and HeroUI (v2).

[Try it on CodeSandbox](https://githubbox.com/frontio-ai/vite-template)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [HeroUI](https://heroui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)

## How to Use

To clone the project, run the following command:

```bash
git clone https://github.com/frontio-ai/vite-template.git
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/frontio-ai/vite-template/blob/main/LICENSE).
