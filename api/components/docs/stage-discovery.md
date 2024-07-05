### Discovery

As mutual fund schemes don't change very often and definitely need not be real time, the buyer app can pull all the schemes once and register for incremental updates.

#### Incremental Updates
For buyer apps who registered for incremental updates, the seller app shall make un-solicited `on_search` calls whenever there is a change that happens to the schemes.

As we have schemes, scheme plans and thresholds, when an incremental update is sent, the entire chain is sent by the seller app.