# Figma Make Prompt

Use this prompt in Figma Make after you have generated/imported the assets and exported the FigJam Story CSV table.

```text
Build a simple playable visual novel prototype using the imported assets and the Story CSV Table below.

Important:
- Do not generate new image assets.
- The values ending in .png are asset names, not URLs.
- Match each .png value to the imported Figma Make asset with the same name.
- If an asset is missing, create a clearly labeled placeholder but keep the story playable.

Prototype goal:
Create a polished 16:9 anime western visual novel demo with dialogue, character sprites, branching choices, and endings.

CSV schema:
id,type,background,left,center,right,speaker,line,next,choices,end

How to interpret the CSV:
- Each row is one story beat.
- id is the unique beat identifier.
- type can be dialogue, choice, or result.
- background is the scene background asset.
- left, center, and right are character sprite asset names.
- speaker is the current speaker name.
- line is the dialogue or narration text.
- next is the next beat id for normal dialogue rows.
- choices is used only for choice rows.
- end is true only for the final row.

Rendering rules:
- Create a fixed 16:9 game frame.
- Show the background image full-frame with cover behavior.
- Place the left sprite on the left side.
- Place the center sprite in the center.
- Place the right sprite on the right side.
- Keep character sprites anchored near the bottom of the frame.
- Do not let character sprites cover the dialogue text.
- Use subtle scale differences if needed so all characters fit.
- Show a dialogue box across the bottom of the screen.
- Show the speaker name in a small nameplate above or inside the dialogue box.
- Show the dialogue line in large readable text.
- Add a Next button for dialogue rows.
- Use a simple polished anime western visual style.
- Keep the UI clean, readable, and not overly decorative.

Navigation rules:
- Start at the first row in the table.
- For dialogue rows, clicking Next moves to the row whose id matches the next column.
- For choice rows, do not show the Next button.
- For choice rows, parse the choices column into buttons.
- Choices use this format:
  Label->target_id|Label->target_id|Label->target_id
- Each choice button should display the label before the arrow.
- When clicked, each choice button routes to the matching target_id.
- For result rows, show the ending screen and stop navigation.
- If end is true, stop navigation.

Choice UI:
- Show choice buttons above the dialogue box or centered in the lower half of the screen.
- Make each choice clearly clickable.
- Preserve the current background and character sprites while showing choices.
- After a choice is selected, continue through that ending path.

Ending behavior:
- The Cowboy ending should follow the Cowboy wins branch.
- The Robot ending should follow the Robot wins branch.
- The Nobody wins ending should follow the Nobody wins branch.
- All ending branches should eventually route to the final result row.
- On the final result row, show a clean ending state with no Next button.

Implementation rules:
- Use only the imported assets and the CSV below.
- Do not add minigames.
- Do not add inventory.
- Do not add audio.
- Do not add extra story branches.
- Do not rename story ids.
- Do not change the CSV logic.
- Keep the prototype simple, understandable, and playable.

Quality checklist:
- The first scene loads correctly.
- The Next button advances through dialogue.
- Backgrounds update based on the background column.
- Character sprites update based on left, center, and right columns.
- The choice row shows three buttons.
- Each choice button routes to the correct ending branch.
- The final result row stops the prototype.
- Text is readable on top of all backgrounds.
- The layout works at desktop preview size.
```
