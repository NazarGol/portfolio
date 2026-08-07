# ZhBK-185: tracing captured Ukrainian plants into a Russian corporate network

> **Sample analytical report — training exercise.**
> This is not client work and was not commissioned. It is published to show method.
>
> Individuals are anonymised by role throughout. Corporate registry identifiers are retained: companies operating in occupied territory are legitimate subjects of open-source research, and the registry numbers are the evidence. Personal-profile links have been removed.

**Nazar Golianych** · OSINT analyst

---

## The question

ZhBK-185 (ЖБК 185) produces anti-tank obstacles — "dragon's teeth" — in occupied Zaporizhzhia oblast, at sites in Berdiansk and Melitopol. Those are not new-build factories. They are Ukrainian reinforced-concrete plants that existed before the occupation and were taken over.

Four questions follow, and they are the questions that matter for any occupied-asset case:

1. Which Ukrainian companies and production facilities were captured and are now being used?
2. Is the management of the successor operation connected to the original Ukrainian companies?
3. What other companies is the operation linked to?
4. What can be established about its finances?

## Finding 1 — Two plants, two different capture patterns

**Melitopol.** The pre-occupation entity was a Ukrainian private joint-stock company, a reinforced-concrete structures plant. After the occupation the asset split in two along the front line: the Ukrainian legal entity was re-registered inside the Ukrainian system as a limited liability successor, while a **new Russian company was incorporated** — OGRN 1229000000646, INN 9001000514 — and it is the Russian entity that actually operates the plant under the ZhBK-185 brand.

**Berdiansk.** A different pattern. The pre-war operator was a Ukrainian company, EDRPOU 32973034, at Melitopolske Shose 86. After the occupation, operations were taken over by Russian-registered entities **at the same physical address**. The address is the pivot: searching Russian registries for the original plant address surfaces the current occupant.

The INN prefix `9001` on the Melitopol successor is itself an indicator — that range was allocated for entities registered in the occupied territories, so the number encodes the circumstances of its own creation.

## Finding 2 — Management continuity across the seizure

This is the substantive finding, and it is the reason the question about management links is the right question to ask.

**Melitopol.** The person who was the long-standing director of the *pre-war Ukrainian company* is now **General Director of the Russian successor entity**, appointed June 2023, and holds a founder's stake of approximately 20.5%.

The plant did not merely change hands. Its management stayed in place and acquired equity in the Russian vehicle that took it. That is a materially different fact from a seizure conducted by outside operators, and it changes what the case is — from expropriation to collaboration, with a documented ownership interest attached.

**Berdiansk.** Pre-war ownership of the plant was linked to the family of a Ukrainian MP. The current director of the Russian entity operating at the original plant address is a **former deputy mayor of Berdiansk and a known political associate of that same MP**. The pre-war political network around the asset is the network now running it.

The Berdiansk entity also uses a corporate email on the domain of the group described in Finding 3 — a small artefact, and one of the harder links in the chain, because an operational email address is chosen for convenience rather than for cover.

## Finding 3 — The wider network

ZhBK-185 is not a company. It is a brand operated across several legal entities, which is what makes the question "provide financial data for ZhBK-185" unanswerable as put — see Finding 4.

| Role | Entity | Identifier |
|---|---|---|
| Main operator, Berdiansk site | Aitech LLC | INN 9710069691 |
| Affiliated | Aitech Group LLC | — |
| Affiliated | Zavod ZhBK-1 LLC | — |
| Public/billing arm | Novoe Snabzhenie LLC | INN 7811642234 |
| Melitopol plant operator | ZZhBK-5 LLC | INN 9001000514 |

Two of these were found by different routes, and the routes are worth naming because they generalise:

- **Aitech** surfaces when the Berdiansk plant's exact street address is searched in Russian corporate registries — an address search, not a name search.
- **Novoe Snabzhenie** is listed as the legal entity on the ZhBK-185 brand's own public website contact page. The operation publishes its billing entity itself.

## Finding 4 — Finances, and why there is no single number

There is no consolidated financial figure for ZhBK-185, because ZhBK-185 is a brand across a network rather than a single legal entity. The correct answer is not an estimate; it is to decline the estimate and report per-entity figures from the registries instead, which is what I did.

One caveat materially limits what the Berdiansk operator's accounts can be made to say: its primary OKVED activity code is **46.71 — wholesale trade in solid, liquid and gaseous fuels**, and the plant is one of some seventy declared activity areas. Its revenue figures therefore cannot be attributed to fortification production. Reporting them as if they represented the plant's output would be wrong, and it is the kind of wrong that looks like a finding.

## Citizenship of the individuals involved

Four individuals hold directing or founding roles across the network. **Three hold Ukrainian citizenship; one is Russian.** The three Ukrainians are the ones running the captured assets.

One detail is worth recording as tradecraft: one individual's Russian INN begins with `23`, indicating it was issued in **Krasnodar Krai**. A tax number carries its issuing region, so it can date and place a person's entry into the Russian administrative system — useful when the question is when someone crossed over, not merely that they did.

## Method

| Step | Approach |
|---|---|
| Pre-occupation entity identification | Ukrainian registry data (EDRPOU) and pre-war corporate directories; securities disclosure records for ownership history |
| Successor identification | Russian corporate registries queried by **address**, not by name — the address survives the renaming |
| Ownership and management | Russian registry aggregators for directors, founders, stakes, appointment dates |
| Network expansion | Names and organisations surfaced in initial reconnaissance, run back through registries; brand website contact pages for billing entities |
| Financials | Per-entity registry financial records, with the OKVED caveat applied before reading them |
| Corroboration | Existing published investigations into the pre-war ownership network, used to check the political-association link rather than to originate it |

The general shape: **identify the pre-war entity, find the successor by physical address rather than by name, then check whether the people are the same.** Names change, corporate forms change, jurisdictions change. Addresses and registry numbers persist, and people are lazier than they are careful.

## Limitations

- **Registry aggregators are secondary sources.** Russian registry mirrors reflect filings, and filings can be stale, incomplete or deliberately misleading. Nothing here is confirmed against a primary Russian state extract.
- **The management-continuity finding rests on name and role matching** across two registry systems in two languages. It is strong — matching directorship, matching plant, documented appointment date — but it is an identity inference, not a documentary confirmation of the same person.
- **Financial figures are entity-level and not attributable to the fortification production line**, per the OKVED caveat above.
- **The network is almost certainly incomplete.** Five entities were established; a brand operating two industrial sites across occupied territory will have logistics, staffing and supply relationships that registry-first research does not reach.
- **Point-in-time.** Directorships and registrations as recorded at the time of research.
