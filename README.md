# Nazar Golianych

OSINT analyst and tool-builder. I work on Russian information and defence-tech infrastructure — sanctions coverage, coordinated information networks, and the corporate record behind both. I build the tooling that makes that work possible at scale, and I publish the method alongside the finding.

**Live site:** [nazargol.github.io/portfolio](https://nazargol.github.io/portfolio)

- [Portfolio](https://nazargol.github.io/portfolio/portfolio/) — investigations and engineering
- [CV (PDF, Ukrainian)](cv/nazar-golianych-cv.pdf)

---

# Investigations

## European Password Manager Shares Origins and Updates With State-Certified Russian Firm

**Investigation · 17 July 2026 · StateWatch / OCCRP**
[StateWatch](https://statewatch.org.ua/en/publications/rozsliduvannia/sanktsii/passwork-fsb-password-manager-eu-government/) · [OCCRP](https://www.occrp.org/en/investigation/european-password-manager-shares-origins-and-updates-with-state-certified-russian-firm)

A password manager presenting itself as European, operating under Russian jurisdiction, holding an FSB cryptographic licence — and installed inside EU public-sector organisations. The product shares origins and update infrastructure with a Russian legal entity licensed by the Federal Security Service for work involving cryptographic tools, plus further FSTEC licences. Those licences open the door to Russian state customers and carry an obligation: a licensed operator can be required to provide access to data in its possession. Its client base ran in both directions — European government institutions and universities on one side, sanctioned Russian companies on the other.

My role was contributing research. The credit is published on the StateWatch article and is quoted here verbatim rather than paraphrased, so it can be checked against the source:

> This investigation was produced with contributions from OCCRP journalists and StateWatch volunteers Matvii Liadov and **Nazar Holianych**.

*Author: Anna Holishevska. Published under the transliteration Holianych.*

---

## The UK has designated none of them

**Analysis · 2026** — [full brief](briefs/russian-military-ai.md)

97 Russian companies, institutes and state structures developing AI for military, surveillance and information-control applications, each checked against four sanctions regimes.

| Jurisdiction | Designated | Share |
|---|---:|---:|
| Ukraine | 47 | 48% |
| United States | 31 | 32% |
| European Union | 21 | 22% |
| United Kingdom | **0** | **0%** |

**62%** carry no Western designation at all. **41%** carry none in any of the four jurisdictions. **20** are Ukraine-listed with no Western follow-through.

A zero is a different kind of number from a low number. US and EU coverage describes a regime engaging with the sector and reaching part of it; an empty column describes one that has not started — and not for want of instruments, since the UK maintains detailed goods-based export controls across 11 schedules under the same Russia regime.

Six functional clusters. Coverage is weakest in the software layers and the institutions behind them — computer vision for surveillance at 77% undesignated, universities at 67%, state funds at 64% — and best in hardware, with microelectronics at 42%. Cluster III, media monitoring and censorship, is the counter-disinformation-relevant cut: 15 entities, the best US ratio of any cluster at 7 of 15, UK zero.

Every entity carries OGRN, INN, addresses in three languages, a sourced designation justification and an explicit per-jurisdiction status. Registry numbers rather than names are the load-bearing choice: Russian corporate names are unstable and routinely re-registered, but a registration number survives renaming.

*The brief publishes the finding, the taxonomy, the record schema and three fully worked examples — all drawn only from entities already under public designation. The dataset itself is held privately; available on request.*

---

## Pro-Russian information network in Moldova

**Analysis · May 2026** — [repository](https://github.com/NazarGol/moldova-information-network)

Within a fixed perimeter of 28 Telegram channels, does the structure look organic — or coordinated?

**27** channels indexed of 28 targeted · **23,110** messages · **424** endorsement links across 164 unique channel pairs · **4** clusters mapped.

`@primulinmd` receives endorsements from all three narrative pipelines — in-degree 83, out-degree 8. A channel cited by ideologically distinct clusters that cites almost nobody in return is the network's shared authority. KP Moldova is the busiest distributor at out-degree 129 and in-degree 0.

Three coordination indicators, weighted separately rather than collapsed: byte-identical same-day texts between two Transnistrian channels; four or more channels framing the 27 May gas VAT decision within hours in near-identical wording; a narrow shared set of externally cited channels across unconnected clusters. Identical text and synchronised timing are consistent with coordination — and also with a shared press-service feed. The report says which is which for each pattern.

*Perimeter defined in advance, so this describes structure inside a boundary rather than a network discovered from scratch. 500 messages per channel, not full history. Explicit links only, so the edge count is a floor. Clustering is manual — the Neo4j GDS plugin was unavailable. Collection ran on GroupInt by OSINT for Ukraine, used as a harness, not authored by me. The raw message corpus is not published.*

---

## ZhBK-185

**Sample report · June 2026** — [full report](briefs/zhbk-185.md)

Two Ukrainian reinforced-concrete plants in occupied Zaporizhzhia oblast, seized and now producing anti-tank obstacles, traced into the Russian corporate network operating them.

At Melitopol, the long-standing director of the pre-war Ukrainian company is now general director of the Russian successor entity, appointed June 2023, holding a founder's stake of about 20.5%. The plant did not merely change hands: its management stayed in place and acquired equity in the vehicle that took it. At Berdiansk the pattern differs — pre-war ownership was linked to the family of a Ukrainian MP, and the current director of the Russian entity at the original plant address is a former deputy mayor and known political associate of that MP.

Method: identify the pre-war entity from Ukrainian registry data, find the successor in Russian registries **by physical address rather than by name** — the address survives the renaming — then check whether the people are the same.

*Sample analytical report — training exercise. Not client work and not commissioned. Individuals anonymised by role; corporate registry identifiers retained.*

---

## Economies of the Aftermath

**Investigation · undated** — [Anti-War Coalition Journal](https://antiwarcoalition.art/texts/16375855-5189-4da4-a8ee-12f2aff4d59e)

Mariupol is routinely described as a city awaiting reconstruction — a framing that assumes destruction is an interruption in an economy that will resume. The piece works from the physical record instead, assessing the city's energy infrastructure from satellite imagery: **15 power transmission lines and 16 substations at 330/220/110 kV**. Transmission assets are large, fixed and identifiable from above, and they determine what an economy can physically do afterwards.

The argument is that such economies read better as an architecture of gaps — disrupted labour, fractured markets, severed infrastructure — than as sites awaiting reconstruction. The distinction is not rhetorical: a site awaiting reconstruction invites asking when rebuilding starts, while an architecture of gaps invites asking who the gaps are for. Grid capacity is where that question becomes answerable, because whoever rebuilds the substations decides what the city can produce and for whom.

*Byline: Nazar Golianych / UA. No date shown on the published page.*

---

## At the break: Territorialization of Arctic

**Investigation · undated** — [published version](https://roflflfl.github.io/portfolio/#arctic-territorialization)

Russia's transformation of the Arctic through extractivist infrastructure, analysed across four case studies with open-source tools: the Prirazlomnaya oil platform, the North Sea Passage, a transarctic fibre-optic cable, and military expansion along the northern border.

Taken together they describe a single process rather than four developments: as accelerating ice loss opens the region, Russia converts new physical access into infrastructural control, reorienting Arctic spatial and economic networks toward East Asia. Extraction, shipping route, data cable and garrison are four layers of one claim — each separately visible in open sources, which is what makes the process traceable without privileged access.

*No date shown on the published page.*

---

# Engineering

## Sanctions Checker — EU · US · UK export-control lookup

**Tool · 2026 · TrapAggressor / StateWatch** — [repository](https://github.com/NazarGol/sanctions-checker)

Answers one question — is this product under sanctions? — returning the legal basis, annex, restriction type, date enacted and a deep link into the official source document. Product names accepted in Ukrainian and English.

Four tiers: alias table → LLM stage → keyword-intersection SQL → rapidfuzz fallback.

**The answer is picked, not written.** Asking a model for an HS code fails in the worst available way: it returns a plausible, correctly-formatted code that does not exist, and in a compliance context a confident wrong code is a false clearance. The failure is not that the model is unreliable — it is that a generated string has no source to check it against. So the model is never asked for a code. It is asked for the **two-digit HS chapter**, a coarse classification into 97 buckets that language models do well. Every database row in that chapter is retrieved, and the model chooses one. Its output is a selection from rows that already exist, so a code absent from the database cannot leave the pipeline. A wrong chapter produces a wrong but checkable real entry, never an invented one.

**Result:** 96.8% classifier accuracy on a 125-query Ukrainian-and-English test set. 7,676 active entries — EU 2,332 · US 2,797 · UK 2,547. ~7,300 lines of Python; 64 pytest tests across 3 modules, plus 5 accuracy harnesses that are how the 96.8% was measured.

**Stack:** Python · FastAPI · SQLite (PostgreSQL migration path) · Ollama `qwen2.5:7b` · rapidfuzz · Docker Compose · nginx + certbot

---

## Corpus Editor — Telegram video pipeline

**Tool · 2026** — [repository](https://github.com/NazarGol/corpus-editor)

Bulk Telegram collection → per-video feature extraction → CLIP embeddings → UMAP 3-D projection → nearest-neighbour graph → SQLite behind FastAPI.

Per-video extraction covers ffprobe metadata, librosa audio energy, OpenCV optical-flow motion and edge complexity, MediaPipe face counts, CLIP zero-shot scene labels and k-means dominant colours. Collection and feature extraction are both resumable: at corpus scale a failure 80% into a run should cost the remaining 20%, not the whole run.

**Result:** 153 videos from 12 channels with 1,100 similarity edges, from a target list of 102 Ukrainian public channels.

Built for a film project, not an intelligence one. It is here because the pipeline underneath is what a media-monitoring system needs, and I would rather show one I built end to end.

*No credentials, session file or scraped corpus are published.*

---

## Querying 77k sanctions entities — SQL and an agent

**Tool · 2026** — [repository](https://github.com/NazarGol/opensanctions-agent)

A Dockerised MindsDB stack over the OpenSanctions consolidated dataset — 76,996 entities — with two query paths compared: manual SQL context, and a tool-calling agent writing its own SQL.

**The useful finding is a negative one.** Asked how many sanctioned entities are from Russia, the agent returned 21,210; direct SQL returned 19,238. The difference is almost certainly multi-country records like `ru;ua` — but that is a reconstruction after the fact. The agent did not show its query, so there was no way to establish which question it had answered without redoing the work it was meant to save. For sanctions screening that is disqualifying: a number without its query is an assertion, not a finding.

A second observation: the second-largest country group in the dataset is `NULL`. For anyone filtering on jurisdiction, that is a silent hole in coverage rather than an empty category.

**Stack:** MindsDB · Docker · Ollama `gemma3:4b` · Groq API · OpenSanctions

---

## Measuring LLM fabrication rate in OSINT profiling

**Method · 2026** — [repository](https://github.com/NazarGol/llm-verification-osint)

The same profiling task run twice — same model, same subject, search disabled on both sides — varying only prompt construction. Twelve claims extracted and checked individually against public sources.

**Result:** unconstrained prompt — **17%** explicit hallucination, **33%** unverifiable claims. Source-constrained prompt on the identical task — **0%** fabrication.

The dangerous errors are the ones that look right: the model placed the subject at the wrong university, and the university it named is a real institution in the same city. The 33% unverifiable band is arguably worse than the 17% fabricated — those claims are not falsifiable, so they survive review as harmless colour, having been generated from nothing.

What moved fabrication to zero was not persona or tone but two clauses: *use only facts explicitly present in the text*, and *if a field is absent, return null*.

Also documents a prompt-injection test — detected and refused unprompted, which is a narrower result than "models are safe" — and an invalid first attempt at the comparison, where I had compared retrieval against no-retrieval rather than two prompts.

*Subject anonymised. One subject, twelve claims: an order-of-magnitude signal about a failure mode, not a benchmark.*

---

## Russia Context Platform

**Research · 2026 · unfinished**

**The problem.** Detecting a synthetic persona means knowing what a convincing one would have to get right. That list is not published anywhere, so detection work runs on intuition about which signals are hard to fake — and intuition is a poor basis for deciding where to spend a detector's attention.

**Approach.** Build the substrate for a single Russian settlement and see how far it gets. Collect the local Telegram channels, regional RSS and VK material for that one place, then synthesise a place profile from it: local geography, institutions, transport, prices, seasonal rhythms, recurring names, register and dialect — deep enough that a generated resident would be hard for an actual resident to catch out. Working at settlement scale rather than national scale is the point: national context is abundant and cheap, and it is the local, unrecorded texture that is expensive.

**How it works.** A collection layer pulls from regional sources on a schedule and normalises the results. Synthesis runs over that corpus into a structured place profile. The primary store is a **wiki rather than a database** — the material is mostly prose with citations, it is edited by hand as often as by machine, and a wiki keeps provenance and revision attached to each claim in a way a schema does not. A knowledge graph sits alongside for entities and relations, with a map layer for the geographic material. Models run locally, since the corpus is regional-language material that does not need to leave the machine. It is unfinished: collection and the wiki store work, the graph is partial, the map layer is early, and synthesis has been run over a small number of settlements rather than at any scale.

**Result.** Five signal classes, ranked by how hard each turned out to fabricate.

| Signal class | Detection surface |
|---|---|
| Place knowledge | Detail finer than public maps carry |
| Temporal habits | Posting rhythm against local hours |
| Dialect, register | Lexis against regional corpora |
| Social graph | Age and reciprocity of ties, not their count |
| **Event memory** | **Recall of what no source ever wrote down** |

The first four turned out tractable: enough local geography, rhythm, lexis and plausible social structure can be assembled from open regional sources to survive casual review. Event memory did not. A profile built from sources can only contain what a source recorded, and the unrecorded local event — the thing everyone in a town knows and nobody wrote down — has no substitute in the corpus.

For detection that inverts the usual priority: effort is better spent probing for recall of unrecorded specifics than on stylometry or posting-time analysis, and coherence *across* classes matters more than any single anomaly. It also sets a realistic ceiling — a detector built on the assumption of sloppy synthesis will not catch competent synthesis, and competent synthesis is achievable with open sources.

*Unfinished and not open-sourced. No repository, no code, no screenshots and no operational parameters.*

---

*Every figure here comes from the code or the source files behind it. Where a number could not be verified, it is not here.*
