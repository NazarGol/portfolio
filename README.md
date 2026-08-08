# Nazar Golianych — OSINT analyst who builds

I work on **Russian information and defence-tech infrastructure** — and I build the tooling to do that work at scale.

**Live site:** [nazargol.github.io/portfolio](https://nazargol.github.io/portfolio)

Contributor to an OCCRP / StateWatch investigation · open-source research for a project supported by Documenting Ukraine, IWM Vienna.

**Contact:** [github.com/NazarGol](https://github.com/NazarGol) · CV on request
*Published under Holianych in OCCRP/StateWatch.*

---

## 01 · Sanctions Checker — EU · US · UK export-control lookup

**→ [github.com/NazarGol/sanctions-checker](https://github.com/NazarGol/sanctions-checker)**

A local tool answering "is this product under sanctions?" — returning the legal basis, annex, restriction type, date enacted, and a deep link into the official source document. Product names accepted in Ukrainian and English.

The classifier runs four tiers: alias table → LLM stage → keyword-intersection SQL → rapidfuzz fallback. The design decision worth explaining is tier two. Asking a model for an HS code fails in the worst possible way — it returns a plausible, correctly-formatted code that does not exist, which in a compliance context is a false clearance. So the model is never asked for a code. It is asked only for the **2-digit HS chapter** — a coarse classification into 97 buckets that language models do reliably — and then re-ranks **within the database rows belonging to that chapter**. Its output is a selection from real rows, not a generated string. A code that is not in the database cannot come out of the pipeline.

**Result:** 96.8% classifier accuracy on a 125-query bilingual test set (Ukrainian and English). 7,676 active entries — EU 2,332 (Reg. 833/2014, 13 annexes) · US 2,797 (EAR Part 746, Supplements 2/4/5) · UK 2,547 (Russia (Sanctions) (EU Exit) Regs 2019, 11 schedules). ~7,300 lines of Python; 64 pytest tests across 3 modules, plus 5 accuracy harnesses that are how the 96.8% was measured.

**Stack:** Python · FastAPI · SQLite (PostgreSQL migration path) · Ollama `qwen2.5:7b` · rapidfuzz · Docker Compose · nginx + certbot

Built for TrapAggressor / StateWatch.

---

## 02 · Analytical writing

**Passwork — an FSB-licensed password manager in EU government systems**
*StateWatch / OCCRP · 17 July 2026 · author Anna Holishevska*

A cross-border investigation into a password manager presenting as European while operating under Russian jurisdiction, holding an FSB cryptographic licence, and counting sanctioned Russian companies among its clients. Co-published by StateWatch and OCCRP with a consortium of European outlets.

My credit, as published on the StateWatch article:

> This investigation was produced with contributions from OCCRP journalists and StateWatch volunteers Matvii Liadov and **Nazar Holianych**.

[StateWatch](https://statewatch.org.ua/en/publications/rozsliduvannia/sanktsii/passwork-fsb-password-manager-eu-government/) · [OCCRP](https://www.occrp.org/en/investigation/european-password-manager-shares-origins-and-updates-with-state-certified-russian-firm)

**ZhBK-185 — tracing captured Ukrainian plants into a Russian corporate network**
*Sample analytical report — training exercise*
Two Ukrainian reinforced-concrete plants in occupied Zaporizhzhia oblast, seized and now producing anti-tank obstacles. Traces each to its successor Russian entity by registry number and physical address, and finds management continuity across the seizure. Individuals anonymised by role.
[Read the report](briefs/zhbk-185.md)

**Occupational Formations**
*Open-source data collection · Documenting Ukraine, a programme of the IWM Vienna*
An interdisciplinary research project on Russian occupational infrastructure in the temporarily occupied territories. My contribution was open-source data: collecting and structuring records on the organisers and executors of construction projects in Russian-occupied Ukrainian territories. Published credit: "with support from Nazar Golianych".
[occformations.com.ua](https://occformations.com.ua/)

**Economies of the Aftermath**
*Essay · Anti-War Coalition*
On economic transformation in post-violence environments, taking Mariupol as its case: systematic infrastructure destruction is what makes a new round of economic colonisation possible, and such economies read better as an architecture of gaps — disrupted labour, fractured markets, severed infrastructure — than as sites awaiting reconstruction.
[antiwarcoalition.art](https://antiwarcoalition.art/texts/16375855-5189-4da4-a8ee-12f2aff4d59e)

---

## 03 · The UK has designated none of them

**→ [Full brief](briefs/russian-military-ai.md)**

97 Russian companies, institutes and state structures developing AI for military, surveillance and information-control applications, each checked against four sanctions regimes.

| Jurisdiction | Designated | Share |
|---|---:|---:|
| 🇺🇦 Ukraine | 47 | 48% |
| 🇺🇸 United States | 31 | 32% |
| 🇪🇺 European Union | 21 | 22% |
| 🇬🇧 United Kingdom | **0** | **0%** |

**62%** carry no Western designation at all. **41%** carry none in any of the four jurisdictions. **20** are Ukraine-listed with no Western follow-through.

A zero is a different kind of number from a low number. US and EU coverage describes a regime engaging with the sector and reaching part of it. Zero describes a sector not engaged at all — and not for want of instruments, since the UK maintains detailed goods-based export controls across 11 schedules under the same Russia regime.

Six functional clusters. Coverage is weakest in the software layers and the institutions behind them — computer vision for surveillance sits at 77% undesignated, universities at 67%, state funds at 64% — and best in hardware, with microelectronics at 42%. **Cluster III** — media monitoring, censorship and cyber operations, 15 entities — is the counter-disinformation-relevant cut.

The brief publishes the finding, the taxonomy, the record schema and three fully worked examples, all drawn only from entities already under public designation. **The dataset itself is held privately; full dataset available on request.**

---

## 04 · Pro-Russian information network in Moldova

**→ [github.com/NazarGol/moldova-information-network](https://github.com/NazarGol/moldova-information-network)**

Graph analysis of 27 Telegram channels: is the structure organic, or coordinated?

**Result:** 27 channels indexed of 28 targeted · 23,110 messages · 424 endorsement links across 164 unique channel pairs · 4 clusters mapped.

`@primulinmd` is the single node receiving endorsements from all three narrative pipelines — in-degree 83, out-degree 8. A channel cited by ideologically distinct clusters that cites almost nobody is the network's shared authority. KP Moldova is the distribution hub at out-degree 129, in-degree 0.

Three coordination indicators, weighted separately rather than collapsed: byte-identical same-day texts between two Transnistrian channels; four or more channels framing the 27 May gas VAT decision within hours in near-identical wording; a narrow shared set of externally cited channels across unconnected clusters.

**Stack:** Python 3.13 · Neo4j · Cypher · Telethon (via GroupInt) · Docker

Telegram collection ran on **GroupInt** by **OSINT for Ukraine** — used as a harness, not authored by me. Report written in Ukrainian.

---

## 05 · Measuring LLM fabrication rate in OSINT profiling

**→ [github.com/NazarGol/llm-verification-osint](https://github.com/NazarGol/llm-verification-osint)**

The same profiling task run twice — same model, same subject, search disabled on both sides — varying only prompt construction. Twelve claims extracted and checked individually against public sources.

**Result:** unconstrained prompt — **17%** explicit hallucination, **33%** unverifiable claims. Source-constrained prompt on the identical task — **0%** fabrication.

Two things matter more than the headline number. The hallucinations that survive review are the ones that look right: the model named the wrong university, and the university it named is a real institution in the same city. And the 33% unverifiable bucket is arguably worse than the 17% fabricated — claims like "speaks at conferences" cannot be disproven, so they pass review as harmless colour, having been generated from nothing.

What moved fabrication to zero was not persona or tone but two clauses: *use only facts explicitly present in the text*, and *if a field is absent, return null*.

Also documents a prompt-injection test, and an invalid first attempt at the comparison — I had compared retrieval against no-retrieval rather than two prompts — because catching a confounded comparison before publishing is the same skill as catching a plausible hallucination before it ships. Verification subject anonymised.

---

## 06 · Querying 77k sanctions entities — SQL and an agent

**→ [github.com/NazarGol/opensanctions-agent](https://github.com/NazarGol/opensanctions-agent)**

A Dockerised MindsDB stack over the OpenSanctions consolidated dataset — **76,996 entities** — with two query paths compared: manual SQL context, and a tool-calling agent writing its own SQL.

**The useful finding is a negative one.** Asked how many sanctioned entities are from Russia, the agent returned 21,210; my direct SQL returned 19,238. The gap is almost certainly multi-country records like `ru;ua` — but that is a reconstruction after the fact. The agent did not show its query, so there was no way to tell which question it had answered without redoing the work it was meant to save. For sanctions screening that is disqualifying: a number without its query is an assertion, not a finding.

**Stack:** MindsDB · Docker · Ollama `gemma3:4b` · Groq API · OpenSanctions

---

## 07 · Corpus Editor — Telegram video pipeline

**→ [github.com/NazarGol/corpus-editor](https://github.com/NazarGol/corpus-editor)**

Bulk Telegram collection → per-video feature extraction → CLIP embeddings → UMAP 3-D projection → nearest-neighbour graph → SQLite behind FastAPI.

**Result:** 153 videos from 12 channels with 1,100 similarity edges, from a target list of 102 Ukrainian public channels.

Built for a film project, not an intelligence one. It is here because the pipeline underneath is what a media-monitoring system needs, and I would rather show one I built end to end.

**Stack:** Python · Telethon · FastAPI · SQLite · CLIP ViT-B/32 · UMAP · OpenCV · MediaPipe · librosa · ffmpeg · Three.js

No credentials, session file or scraped corpus are published.

---

## 08 · Russia Context Platform

**Adversary-capability research:** what a synthetic local persona would have to get right, and therefore where detection has to look.

Everything above this entry is detection-side work. Detection carries a dependency that is rarely stated: a detector is only as good as its model of what it is trying to catch, and that model has to come from somewhere. If the only available description of a synthetic persona is "an account that seems fake", the detection surface is intuition.

So I approached it from the other side — not what a fake account looks like, but what a convincing one would have to *know*, treating each requirement as a place a detector can look.

| Must be faked | Must be checked |
|---|---|
| Place knowledge | Detail finer than public maps carry |
| Temporal habits | Posting rhythm against local hours |
| Dialect, register | Lexis against regional corpora |
| Social graph | Age and reciprocity of ties, not their count |
| **Event memory** | **Recall of what no source ever wrote down** |

Each class is cheap to approximate and expensive to sustain, and each fails in a characteristic way. That asymmetry is the useful part: detection does not have to prove an account is synthetic, only to find the class where the approximation gives way. **Event memory is the hardest to synthesise and therefore the most productive to test** — a persona assembled from open sources can only know what a source recorded.

Framed this way the work is a detection specification rather than a capability. It says where to look and in what order: start with the class cheapest for a defender to test and most expensive for an adversary to sustain, and treat coherence *across* classes — rather than any single anomaly — as the signal. It also sets a realistic ceiling, since several classes are approximable well enough to survive casual review. That is an argument for detection that assumes competent synthesis rather than sloppy synthesis.

**Unfinished, and not open-sourced.** Case study text only — no repository, no code, no screenshots, and nothing describing how such a persona would be constructed.

---

## 09 · Practice

I also work as an artist — moving image, computational and generative work, installation. The technical habits are the same: building tools to handle material at a scale you cannot process by hand, and staying precise about what an image or a dataset actually shows versus what it appears to show.

[roflflfl.github.io/portfolio](https://roflflfl.github.io/portfolio)

---

*Every figure here comes from the code or the source files behind it. Where a number could not be verified, it is not here.*
