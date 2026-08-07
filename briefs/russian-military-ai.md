# The UK has designated none of them

## A four-jurisdiction coverage gap across 97 Russian military-AI entities

**Nazar Golianych** · OSINT analyst

---

## Summary

I mapped 97 Russian companies, institutes and state structures developing AI for military, surveillance and information-control applications, and checked each one against four sanctions regimes.

| Jurisdiction | Entities designated | Share of 97 |
|---|---:|---:|
| 🇺🇦 Ukraine | 47 | 48% |
| 🇺🇸 United States | 31 | 32% |
| 🇪🇺 European Union | 21 | 22% |
| 🇬🇧 United Kingdom | **0** | **0%** |

**The United Kingdom has designated none of them.**

Three further figures define the gap:

- **62%** (60 of 97) carry **no Western designation at all** — not US, not EU, not UK.
- **41%** (40 of 97) carry **no designation in any of the four jurisdictions**, including Ukraine's.
- **20 entities are Ukraine-listed with no Western follow-through** — already assessed as contributing to the war effort by the state fighting it, and untouched by any Western regime.

The finding is not that these entities are unknown. Ukraine has designated 47 of them, and the justification for each is publicly sourced. The finding is that Western designation is not following, and that in one jurisdiction it has not started.

## Why the UK zero is the headline

A zero is a different kind of number from a low number. US and EU coverage at 32% and 22% describes a regime that is engaging with this sector and has reached part of it — partial, lagging, but present. A zero describes a sector that has not been engaged at all.

The UK maintains an extensive Russia sanctions regime under the Russia (Sanctions) (EU Exit) Regulations 2019, including detailed goods-based export controls across 11 schedules. The absence is therefore not a matter of the UK lacking a Russia regime or lacking the instruments. It is that the military-AI developer layer specifically — the companies writing the targeting, recognition, monitoring and censorship software rather than manufacturing the platforms it runs on — has not been reached by it.

That layer is where a growing share of capability now sits. Sanctioning a drone manufacturer while leaving the company supplying its autonomous targeting stack undesignated addresses the airframe and not the capability.

## Cluster taxonomy

The 97 entities fall into six functional clusters. Coverage is uneven across them, and the unevenness is informative.

| Cluster | Entities | UA | US | EU | UK | No Western designation |
|---|---:|---:|---:|---:|---:|---:|
| **I.** UAV, unmanned ground systems and weapons AI | 34 | 16 | 11 | 6 | 0 | 22 (65%) |
| **II.** Computer vision for surveillance and biometric control | 13 | 3 | 1 | 2 | 0 | 10 (77%) |
| **III.** Media monitoring, censorship and cyber operations | 15 | 4 | 7 | 2 | 0 | 8 (53%) |
| **IV.** Component base, microelectronics and hardware | 12 | 10 | 5 | 6 | 0 | 5 (42%) |
| **V.** Universities and research institutes | 12 | 8 | 4 | 3 | 0 | 8 (67%) |
| **VI.** State funds, accelerators and administrative structures | 11 | 6 | 3 | 2 | 0 | 7 (64%) |
| **Total** | **97** | **47** | **31** | **21** | **0** | **60 (62%)** |

**Cluster IV is the best-covered** at 42% without Western designation — unsurprising, since microelectronics and component supply chains have been the primary focus of export-control policy since 2022. Hardware is legible to a sanctions regime built around goods.

**Cluster II is the worst**, at 77%. Computer vision for surveillance and biometric control is almost entirely undesignated in the West: 13 entities, one US listing, two EU, none UK.

**Clusters V and VI — universities and state funding structures — sit at 67% and 64%.** These are the pipeline: the institutions producing the researchers and directing the money. They are harder to designate, for real reasons of academic freedom and proportionality, but the effect of leaving them out is that the sector's inputs remain untouched while its outputs are sanctioned one company at a time.

## Cluster III — the counter-disinformation cut

Fifteen entities develop media monitoring, censorship and cyber-operations tooling. This is the cluster that matters to anyone working on information operations, because these are the systems that detect, characterise and act on the information environment inside Russia — and increasingly, on its perimeter.

**US coverage is comparatively strong here — 7 of 15, the best US ratio of any cluster.** EU coverage is 2. Ukraine's is 4. The UK's is zero.

The functional profile is consistent across the cluster: social-media and mass-media monitoring platforms, sentiment and "author" analysis, automated detection of undesirable content, and threat-intelligence tooling sold to state customers. Several are marketed openly to government buyers, with public-sector client lists and, in at least one case, an explicit claim to be able to forecast public reaction to state initiatives and to identify and "work with" difficult authors and opinion leaders.

That last capability is worth stating plainly, because it is the point at which a media-monitoring product stops being analytics: identifying influential critics and routing them to an intervention is the operational core of an information-control system, and it is being sold as a commercial feature.

The cluster spans both directions of the same discipline: platforms oriented at monitoring and shaping the domestic information space, and companies building content-classification systems used by the federal communications regulator. The technical distance between "detect undesirable content at national scale" and the detection systems a counter-disinformation vendor builds is small. The difference is entirely in who points it and at whom.

## Methodology

**Entity identification.** Entities were identified from Russian-language open sources: company self-description and product documentation, state and state-adjacent media reporting on capability deployment, procurement and contract records, technology-park and accelerator residency lists, university laboratory pages, and investigative reporting by independent Russian and international outlets. Inclusion requires a sourced link between the entity and a military, surveillance or information-control application of AI — not merely that the entity works on AI in Russia.

**Records.** Each entity carries a full record:

| Field | Content |
|---|---|
| Name (RU / UK / EN) | Legal name in three languages |
| AI type | Functional classification of what the entity develops |
| OGRN | Primary state registration number |
| INN | Taxpayer identification number |
| Address (RU / UK / EN) | Registered address in three languages |
| Designation justification | Sourced narrative of the entity's role — the case for listing |
| Sources | Public URLs supporting the justification |
| Ukraine / US / EU / UK | Sanctions status, one column per jurisdiction |
| Cluster | I–VI |

Recording OGRN and INN rather than names alone is the load-bearing decision. Russian corporate names are unstable, frequently duplicated, and routinely re-registered; a registration number survives renaming and is what makes an entity matchable against a sanctions list, a procurement record or a corporate registry. Trilingual name and address fields exist so that a record can be handed to a Ukrainian, EU or US counterpart and used without re-derivation.

**Sanctions status** was checked per entity against each of the four regimes' published lists, recorded as an explicit binary — listed or not listed — for every jurisdiction. No jurisdiction is inferred from another. The empty cells are as deliberate as the filled ones: a blank is a checked negative, not an unchecked field, which is what allows the coverage gap to be counted rather than estimated.

**Cluster assignment, and one resolved conflict.** Each entity carries a cluster in two places: the section it sits under, and an explicit cluster field on its own row. For 96 of 97 entities these agree. For one they did not — its row field read Cluster I while it sat under Cluster III.

I resolved it to **Cluster III** on two independent grounds. Its functional classification field reads "content analysis", which is the value carried by every one of the 15 Cluster III entities and by none of the Cluster I entities (those are uniformly UAV, unmanned-ground-system and weapons-control types). And its sourced justification describes it as the largest IT supplier to the federal communications regulator and that regulator's subordinate radio-frequency centre, funded principally through state contracts — a media-monitoring and censorship function, not a weapons one. The row field is a data-entry error.

This moves one entity between clusters relative to a naive read of the row fields: **Cluster I is 34 and Cluster III is 15**, not 35 and 14. The total of 97 is unaffected, as is every jurisdiction count, since the entity in question is undesignated in all four regimes. It is not named here for that reason — it is not under public sanction anywhere, and the rule governing this brief is that only already-designated entities are identified.

**A note on what this measures.** Designation status is a snapshot. Sanctions lists change, and any of these figures can be moved by a single listing round. The 97 figure is a floor on the sector, not a census of it — it is what a systematic open-source sweep surfaced, and the true population of Russian entities working on military and surveillance AI is larger.

## Worked examples

Three entries in full, to demonstrate the record structure.

**All three are already under public designation in at least one jurisdiction.** Nothing below is disclosed that is not already a published sanctions listing. Undesignated entities from the dataset are not used as examples, and are not named anywhere in this brief.

---

### Neobit LLC · ООО «Необит»

| Field | Value |
|---|---|
| **OGRN** | 1077847257641 |
| **INN** | 7804360292 |
| **Address** | 195220, St. Petersburg, Gzhatskaya St., 21, letter G |
| **AI type** | Content analysis |
| **Cluster** | III — media monitoring, censorship, cyber operations |
| **🇺🇦 Ukraine** | **Listed** |
| **🇺🇸 US** | **Listed** — OFAC, 15 April 2021 |
| **🇪🇺 EU** | Not listed |
| **🇬🇧 UK** | Not listed |

**Justification.** Russian IT company whose client base includes the Ministry of Defence, the FSB, JSC Voentelecom and the Federal Protective Service. Develops intelligent threat-analysis and search systems, a neural-network photo and video classification system ("SortSystems"), and "Vepr" — a system for detecting undesirable content and "information threats" — used by Roskomnadzor, the federal communications regulator.

*Illustrates the cluster's dual character: the same company supplies security-service customers and the censorship apparatus.*

---

### PalitrumLab LLC · ООО «ПалитрумЛаб»

| Field | Value |
|---|---|
| **OGRN** | 1137746018156 |
| **INN** | 7727796050 |
| **Address** | 121205, Moscow, Nobelya St. (Skolkovo Innovation Center Territory), 7, prem. 47 |
| **AI type** | Content analysis |
| **Cluster** | III — media monitoring, censorship, cyber operations |
| **🇺🇦 Ukraine** | Not listed |
| **🇺🇸 US** | **Listed** |
| **🇪🇺 EU** | Not listed |
| **🇬🇧 UK** | Not listed |

**Justification.** Skolkovo resident. Developer and rights holder of **Brand Analytics**, a social-media and mass-media monitoring and analysis platform, with a large number of government bodies and state companies among its clients. By its own published claims the platform can forecast public reaction to state initiatives, assess the effectiveness of the authorities' actions, and identify and "work with" difficult authors and opinion leaders.

*A US designation with no EU, UK or Ukrainian counterpart — a single-jurisdiction listing on a platform sold openly to Russian government buyers.*

---

### Cribrum JSC · АО «Крибрум»

| Field | Value |
|---|---|
| **OGRN** | 1107746952433 |
| **INN** | 7731661104 |
| **Address** | 121357, Moscow, Mozhaisky district, Vereiskaya St., 29, bldg. 134, prem. 2Н/7 |
| **AI type** | Content analysis |
| **Cluster** | III — media monitoring, censorship, cyber operations |
| **🇺🇦 Ukraine** | Not listed |
| **🇺🇸 US** | **Listed** |
| **🇪🇺 EU** | Not listed |
| **🇬🇧 UK** | Not listed |

**Justification.** Social-media monitoring and analysis system founded in 2010 by Igor Ashmanov together with Natalya Kaspersky's InfoWatch group; positioned for "reputation management", "information security" and "threat forecasting". Received investment from Rosinfocominvest, a state fund accountable to the Ministry of Digital Development, jointly with InfoWatch. The system is used in the context of state information control.

*Shows the state-fund-to-vendor pathway that Cluster VI exists to capture: a state fund invests, a private vendor delivers, and only the vendor is designated.*

---

## What follows from this

1. **The UK's Russia regime has a sector-shaped hole in it.** Zero of 97 is not a matter of degree. The instruments exist; the military-AI developer layer has not been brought inside them.
2. **Twenty entities are already Ukraine-designated with a public, sourced justification and no Western follow-through.** These are the lowest-friction candidates for alignment, because the identification and evidentiary work is done and published.
3. **Coverage is weakest exactly where capability is growing fastest.** Computer vision for surveillance sits at 77% undesignated; the universities and state funds feeding the sector sit at 67% and 64%. Policy has tracked hardware, which is legible to a goods-based regime, and has not tracked software.
4. **Cluster III should be read as a counter-disinformation problem, not only a sanctions one.** These are the systems that detect and act on the information environment. Understanding what they can do is a prerequisite for understanding what a detection capability has to catch.

---

## Availability

This brief publishes the finding. The underlying dataset — all 97 entities with full registry identifiers, trilingual addresses, sourced designation justifications and per-jurisdiction status — is held privately.

**Full dataset available on request.**
