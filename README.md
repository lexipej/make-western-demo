# Cowboy vs Robot — Visual Novel Demo

A playable anime western visual novel prototype built with [Figma Make](https://www.figma.com/make/).

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
