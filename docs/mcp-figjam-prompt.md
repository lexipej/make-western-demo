# MCP FigJam Prompt

Use this prompt with any AI assistant that has Figma MCP access. It creates the FigJam planning board, including the story CSV table, asset manifest, Weave prompts, and Make prompt.

```text
Use an AI assistant with Figma MCP access to create a new FigJam file named:

Western Demo

Important setup rules:
- First verify the Figma connection/account with the available Figma MCP tool.
- Then create a new FigJam file with the exact filename above.
- After creating the file, inspect the blank FigJam board before writing content.
- Use native FigJam sections and native FigJam tables.
- Do not ask me to manually create anything.
- Do not use markdown tables as a substitute for FigJam tables.
- For long prompt content, use a normal FigJam text node or shape-with-text, not a code block.
- Build incrementally and validate at the end.
- If a Figma write fails atomically, fix the script and retry without changing the content plan.

Create five FigJam sections:

1. Story Brief
2. Story CSV Table
3. Asset Manifest
4. Figma Weave Asset Prompts
5. Figma Make Prompt

Project goal:
Create a repeatable workflow where an AI assistant generates the structured story table in FigJam, Figma Weave generates anime-style assets, Figma Design organizes the assets, and Figma Make builds a playable visual novel prototype.

Story premise:
Write a funny cinematic western visual novel about a dramatic Cowboy and a literal Robot arguing in front of a capable saloon Bartender.

Story structure:
- Act 1: Inside the saloon.
- Act 2: Outside on the dusty main street.
- Act 3: Player chooses the duel outcome.
- Endings:
  - Cowboy wins
  - Robot wins
  - Nobody wins

Create a native FigJam table named "Story CSV Table" with this exact column order:

id
type
background
left
center
right
speaker
line
next
choices
end

Create exactly 30 story rows total:
- 12 dialogue rows inside the saloon
- 8 dialogue rows outside before the duel choice
- 1 choice row
- 3 dialogue rows for Cowboy wins
- 3 dialogue rows for Robot wins
- 2 dialogue rows for Nobody wins
- 1 final result row

CSV rules:
- Use type "dialogue", "choice", or "result".
- Every dialogue row must have id, type, background, speaker, line, and next.
- The choice row must use the choices column and must not have a next value.
- Choices must use this exact format:
  Cowboy wins->s3_cowboy_01|Robot wins->s3_robot_01|Nobody wins->s3_nobody_01
- Every next value must point to an existing id.
- Every choice target must point to an existing id.
- The final result row must have type "result" and end set to true.
- Keep each line short enough for a visual novel dialogue box.

Writing rules:
- Keep the story PG.
- Cowboy is dramatic, proud, and theatrical.
- Robot is literal, precise, and accidentally funny.
- Bartender is calm, capable, and tired of both of them.
- Bartender must have agency and drive the final choice moment.

Use these exact sprite filenames:

cowboy-neutral.png
cowboy-angry.png
cowboy-happy.png
robot-neutral.png
robot-tense.png
robot-happy.png
bartender-neutral.png
bartender-worried.png
bartender-relieved.png

Use these exact background filenames:

bg-saloon.png
bg-duel-street.png
bg-sunset-ending.png

Placement rules:
- Cowboy goes in left.
- Bartender goes in center.
- Robot goes in right.
- Saloon rows use bg-saloon.png.
- Duel rows use bg-duel-street.png.
- Ending rows use bg-sunset-ending.png.

Create a native FigJam table named "Asset Manifest" with columns:

asset_filename
asset_type
used_for
prompt_hint

Include all 12 assets.

Create a native FigJam table named "Figma Weave Asset Prompts" with columns:

asset_filename
asset_type
style_anchor
prompt
negative_prompt

Global Weave style:
Polished 2D anime visual novel style, cinematic western setting, warm sunset palette, crisp linework, expressive faces, clean game-ready assets, no readable text, no watermark, no logo.

Character asset rules:
- Knee-up or full-body anime sprites.
- Transparent background if possible.
- Same character must stay consistent across variants.
- Preserve costume, silhouette, colors, proportions, and facial structure.
- Mostly forward-facing with slight 3/4 angle.

Background asset rules:
- 16:9 anime environment art.
- No foreground characters.
- Leave lower third readable for dialogue UI.
- No readable text, logos, or watermarks.

Create one Weave prompt row per asset filename.

Create a "Figma Make Prompt" section as a normal readable text block.

The Figma Make Prompt must explain:
- Parse each row as one story beat.
- Show background from the background column.
- Show left, center, and right sprites.
- Show speaker and line in a dialogue box.
- Next button uses the next column.
- Choice rows parse the choices column.
- Result or end rows stop the prototype.
- Build a simple polished 16:9 anime western visual novel UI.
- No minigames, no inventory, no audio required.

Before finishing, validate and add a small validation note in FigJam:
- Confirm the file name is Western Demo.
- Confirm exactly five workflow sections exist.
- Confirm the Story CSV Table has exactly 30 story rows.
- Confirm every next points to an existing id.
- Confirm every choice target points to an existing id.
- Confirm there is exactly one choice row.
- Confirm there is exactly one result row.
- Confirm the result row has end set to true.
```
