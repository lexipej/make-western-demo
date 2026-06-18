# Cowboy vs Robot — Visual Novel Demo

A playable anime western visual novel prototype built with [Figma Make](https://www.figma.com/make/).

## Workflow

Planning board: [Western Demo FigJam](https://www.figma.com/board/uaxvNS3n7yOvsfXJ61Z03x/Western-Demo?node-id=0-1&t=XweQzmvkim87tBuH-1)

Prompt docs:
- [MCP FigJam Prompt](docs/mcp-figjam-prompt.md)
- [Figma Make Prompt](docs/figma-make-prompt.md)

The core workflow is:

1. Use an AI assistant with Figma MCP access to create the FigJam planning board.
2. Export/download the FigJam Story CSV table.
3. Generate assets in Figma Weave from the asset prompt table.
4. Organize the assets in Figma Design with filenames matching the CSV.
5. Send assets to Figma Make and use the exported CSV as the story source of truth.

## Story

Three characters. Two rivals. One bartender who is done with everyone's nonsense.

Play through the saloon confrontation and the duel, then choose one of three endings:
- **Cowboy wins**
- **Robot wins**
- **Nobody wins**

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Figma Make (asset pipeline + component imports)

## Assets

Character sprites and backgrounds are imported from Figma. The story is driven by a CSV table (`src/imports/Visual_Novel_Prototype_Workflow_-_Western_Demo.csv`) following the schema:

```
id, type, background, left, center, right, speaker, line, next, choices, end
```

## Fonts

- **Besley Black** — wordmark / COWBOY
- **Geist Light** — wordmark / vs
- **Geist Mono Bold** — wordmark / ROBOT
- **Cinzel** — UI chrome, speaker names, buttons
- **Crimson Text** — dialogue body
