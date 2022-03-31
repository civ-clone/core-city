# core-city

Contains base functionality for the concept of a `City`, including the associated `Rule`s, `CityRegistry` and `AdditionalData`.

## `City`

The main component itself. When constructed, triggers `Created` `Rule`s. Associated to only a `Tile` and a `Player`.
Utilises `Yield`s in the `Cost`, `Yield`, `YieldModifier` and `ProcessYield` `Rule`s.

## `Rule`s

 - `Captured` - When a `City` is captured by another `Player`, this handles any associated events.
 - `Cost` - A `Yield` modifier, used to process a yield after it's been calculated by `Yield` and `YieldModifier`. Things like, `Temple`s reducing unhappiness, or `CivilDisorder` stopping `Gold`, `Production` and `Research`.
 - `Created` - Triggered automatically on construction, this allows binding to the `CityRegistry` or creating a `Palace` for the capital etc.
 - `Destroyed` - Can further trigger a `player:defeated` event and can be used to clean up (remove `Wonder`s, associated `Unit`s etc.).
 - `ProcessYield` - Used at the beginning of a `Turn` to handle storing surplus `Gold` in the treasury, contribute to `Research`, etc.
 - `Yield` - Used to calculate the `Yield`s a `City` provides access to.
 - `YieldModifier` - To augment the `Yield`s for a `City`.

## `AdditionalData`

Adds `city` for `Tile`s and `cities` for `Player`s.
