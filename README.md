# GameJAM · Build together

Two beginner JavaScript activities: a **25-minute clicker branching exercise**, then a **30-minute Pokémon API activity**. Work in pairs. No packages, API keys, or build tools required. Bring two GitHub accounts, a browser, a text editor, and Git (or GitHub Desktop). Basic variables and functions help; API code is scaffolded.

## Run the starter

Download or clone your pair’s fork (setup below). Open the root `index.html` in your browser and choose an activity. Save edits in your editor, then refresh the browser. The clicker works offline. The Pokémon activity needs internet and already searches for Pokémon; displaying the height is your task.

If opening files directly is blocked by your browser, use your editor’s Live Server extension, or run `python3 -m http.server 8000` from the repository folder and visit http://localhost:8000. Windows may use `py -m http.server 8000`. Stop the server with Ctrl+C. Never put passwords or tokens in these files.

## Pair setup · before the activity timer

1. Choose a **fork owner**. Only that person clicks **Fork** on https://github.com/Celinaarakji/GameJAM-workshop1. Create one fork per pair under the owner’s account.
2. In that fork, the owner opens **Settings → Collaborators → Add people**, invites their partner’s GitHub username, and the partner accepts the invitation. Both people will work in this same pair fork.
3. Each partner clones **the pair fork**, not the instructor repository. Replace `PAIR_OWNER` below with the fork owner’s username:

   ```sh
   git clone https://github.com/PAIR_OWNER/GameJAM-workshop1.git
   cd GameJAM-workshop1
   git remote -v
   ```

   `origin` must point to `PAIR_OWNER/GameJAM-workshop1`. In GitHub Desktop, use File → Clone repository → URL with that same fork URL.
4. Run the page on both computers and click three times. The score should be 3. Reset intentionally does nothing yet.

## Activity 1 · Clicker + branches · 25 minutes

| Time | Work |
| --- | --- |
| 0–3 min | Agree who takes each feature; start from updated main. |
| 3–11 min | Each partner creates their own branch, edits only their assigned file, and tests. |
| 11–20 min | Push both branches, open two PRs, and review each other’s change. |
| 20–25 min | Merge both PRs into the pair fork’s main; both pull and test together. |

**Partner A: score multiplier** — branch `feature/multiplier`, file `clicker/multiplier.js`. Complete its one TODO so every click adds **2 points**. Keep the function name. Test: refresh, click three times → score 6.

**Partner B: reset button** — branch `feature/reset`, file `clicker/reset.js`. Complete its one TODO so Reset returns the displayed score to **0**. The comments explain the shared score variable and the display function. Test: click a few times, Reset → 0, then click again → 1 before the multiplier merges (2 afterward). Reset at zero should still work.

Each partner runs the following (A uses `feature/multiplier`; B substitutes `feature/reset` and `clicker/reset.js`):

```sh
git switch main
git pull origin main
git switch -c feature/multiplier
# Edit your assigned file, save, refresh the browser, and test.
git add clicker/multiplier.js
git commit -m "Add score multiplier"
git push -u origin feature/multiplier
```

### Open and review each PR — check the destination!

1. On **the pair fork**, choose Pull requests → New pull request. Use **compare across forks** if needed.
2. Set **base repository = PAIR_OWNER/GameJAM-workshop1**, **base branch = main**. Set **head repository = the same pair fork**, **compare branch = your feature branch**. GitHub may default the base to the instructor repo: change it. **Do not send workshop PRs to the instructor repo.**
3. Give the PR a clear title and describe what you changed and how you tested it. In Files changed, check that only your assigned file changed.
4. Your partner reads the diff, tests the branch locally if time allows, and leaves a review. To test a partner branch: `git fetch origin`, then `git switch --track origin/feature/reset` (substitute the branch name; if already local, use `git switch feature/reset`). Save or commit your own work before switching.
5. Merge each PR into **the pair fork’s main**. After both merges, both partners run:

   ```sh
   git switch main
   git pull origin main
   ```

6. Refresh: three clicks → 6; Reset → 0; one more click → 2. Both features now work together.

GitHub Desktop equivalent: select main → Fetch/Pull origin → New branch → edit → review Changes → Commit → Publish branch → Create Pull Request. Check the base repository in the browser exactly as above.

## Activity 2 · Pokémon Explorer · 30 minutes

Use the **same fork**. Pair program: one person types, the other reads and checks; swap roles halfway through. Start on updated main, create `feature/pokemon-explorer`, and edit only `pokemon/explorer.js`.

| Time | Work |
| --- | --- |
| 0–7 min | Instructor demonstrates a search and walks through request → JSON → display. |
| 7–12 min | Search for different Pokémon. Open https://pokeapi.co/api/v2/pokemon/pikachu/ and find `name` and `height`. |
| 12–22 min | Complete the height TODO in `showPokemon(pokemon)`; swap roles and explain your change. |
| 22–30 min | Test, push, review, and merge a PR into your own fork’s main; pull and demo. |

An **API** lets your page ask another service for data. **JSON** is the data format returned. The request code is provided: the instructor will demonstrate `loadPokemon` before you begin. You do not need to write the request code.

In `showPokemon`, the working name display is your example: `pokemon.name` reads a value from the returned object, and `nameText.textContent` changes the text on the page.

**Your task:** replace the question mark in the height display with the Pokémon’s height in metres. Read the comment about the API’s height units and use the name display as a pattern. Keep the starter valid JavaScript as you work; there are no blank syntax placeholders.

The form, image, loading message, error handling, normalized input, and page-session cache are provided. There is **one required TODO**. Reference: https://pokeapi.co/docs/v2/#pokemon. PokéAPI needs no API key. Repeated successful searches reuse cached data while this page is open.

### Test your explorer

- `pikachu` shows its name, sprite (if provided), and height of 0.4 m.
- `eevee` and `1` show different Pokémon.
- ` PIKACHU ` works after whitespace and case normalization.
- `not-a-real-pokemon` shows a friendly error, hides the previous result, and lets you search again.
- With internet disabled, an uncached search shows an error. Reconnect and retry. A previously cached search may still succeed.
- Press Enter in the input to search; try navigating with Tab.

Commit `pokemon/explorer.js`, push `feature/pokemon-explorer`, and use the same PR steps above. Both partners then update main. Optional if finished early: change the page colors or add a description of what an API does to the README.

## Troubleshooting

| Problem | Try this |
| --- | --- |
| Push denied / 403 | Accept the collaborator invitation; check `git remote -v` points to the pair fork; sign in to the correct GitHub account. HTTPS Git uses browser/token authentication, not your GitHub account password. |
| PR points to Celinaarakji | Change the base repository to the pair owner’s fork before creating it. |
| No changes to compare | Save, commit, and push your feature branch; select it as compare and main as base. |
| Branch already exists | Use `git switch BRANCH_NAME` instead of creating it again. |
| Push rejected because remote changed | Commit local work, then `git pull --rebase origin YOUR_BRANCH`; ask the instructor for help if a conflict appears. Avoid force pushing. |
| Merge conflict | Ask the instructor. Edit the marked section to keep the intended code, remove conflict markers, test, then commit the resolution. Separate clicker files should avoid conflicts. |
| Page unchanged | Save the correct file, refresh, and check you opened the right clone and branch. Open browser Developer Tools → Console for errors. |
| Reset does nothing / height shows ? | Those are the intended unfinished features. Find the TODO in your assigned file. Pokémon names and images should work immediately. |
| Pokémon search fails | Check spelling, internet, and the API link above. Check Console for errors. Some Pokémon have special hyphenated names. |
| Port 8000 is busy | Use `python3 -m http.server 8001` and visit http://localhost:8001. |
| Git is unavailable | Use GitHub Desktop, or edit each file on GitHub on your feature branch and use Download ZIP to test that branch locally. |

## Files

`clicker/` contains the game and its two feature files. `pokemon/` contains the API activity. `styles.css` is shared. No instructor answers are included in this starter.

Pokémon and character names belong to their respective owners. This is an unofficial educational activity; data and sprites are served by PokéAPI.
