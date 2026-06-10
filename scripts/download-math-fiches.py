#!/usr/bin/env python3
"""
Télécharge les PNG des fiches CM2 Mathématiques depuis Google Drive,
les organise par notion/feuille, et génère un PDF pour chacun.

Usage:
    python3 scripts/download-math-fiches.py

Prérequis:
    - Le dossier Google Drive doit être partagé en "Toute personne avec le lien"
    - pip install img2pdf Pillow requests
"""

import os
import re
import sys
import json
import time
import requests
import img2pdf
from pathlib import Path
from PIL import Image

# ── Dossier de destination ───────────────────────────────────────────────────

BASE_DIR = Path(__file__).parent.parent / "public" / "fiches" / "cm2" / "mathematiques"

# ── Tous les fichiers PNG collectés depuis Google Drive ──────────────────────
# Format: (file_id, original_title)

FILES = [
    # ── Page 1 ──────────────────────────────────────────────────────────────
    ("1ui7bkSLNdhIg6X7JEMiO9V9M5W7njvIN", "Évaluation - Résoudre une enquête mathématique.png"),
    ("12OrZ4a-MfKgZSv-KuvLkauKV1N380L3p", "Réviser les notions essentielles de géométrie - Feuille 2.png"),
    ("15qh3W4lQlqy8agMiSSPnvYdSWDCpOkWy", "Évaluation — Réviser les nombres et les calculs.png"),
    ("1RbgWNuDYTY7YDmIy0ZOD4jn_d3C28OZE", "Utiliser plusieurs outils géométriques - Feuille 2.png"),
    ("1fV5WJkTc-aaKPnuAZegQTPYcEOsVOIFu", "Évaluation - Préparer l'entrée en 6e.png"),
    ("1xpMmbKHaXq55_Pzzvx7BdCwOt7f3ih69", "Choisir la bonne méthode en géométrie - Feuille 1.png"),
    ("1iTSwz9Xrhu80fvxYrfYfIpXgmqo5uSkW", "Bilan final de mathématiques CM2 - Feuille 2.png"),
    ("1Jb2vrXCn_G698_cTY8ZetL89ppoufL8E", "Résoudre une mission géométrique complète - Feuille 2.png"),
    ("1j25rJwNKHx_6qK1XCxD0b9gBvI5LaQ-s", "Choisir la bonne méthode en géométrie — Feuille 2.png"),
    ("1h_ElhCSGsVMHxcMQREUpdyJvZN1717EW", "Lire une maquette ou un plan simplifié — Feuille 2.png"),
    ("1BRgQGDcFyQjsLB1ON065obWk66PTP9oF", "Utiliser plusieurs outils géométriques — Feuille 1.png"),
    ("1jW3YlJaKM0ycTnOPepptZShjf1qDZ8iZ", "Évaluation - Résoudre des problèmes de synthèse.png"),
    ("19erQ4dBLCmburD7w4ioy2G_o2RZXrEX5", "Bilan final de mathématiques CM2 - Feuille 1.png"),
    ("1c0CvuJ-11AtZAPt--EOqn3ckOfE24MBB", "Évaluation - Lire un graphique simple.png"),
    ("1TfHI41Vp0yOlcWmUoFrw4GoWcFNHe21F", "Résoudre une mission géométrique complète - Feuille 1.png"),
    ("1zDtGgU8zasAT7xWC2xwjOGuvHs7RGoWF", "Évaluation — Choisir la bonne méthode en géométrie.png"),
    ("1xU4DYQH7afeAReIgxLMwHxbMr5GFMix8", "Interpréter des données - Feuille 1.png"),
    ("1p_IzDJLukpSJL7MBEaRhOCLgkD2ijr71", "Évaluation - Résoudre une mission géométrique complète.png"),
    ("11Z8aSBQmwx21v7lCQZsVeJUpgi82SZfm", "Évaluation — Lire une maquette ou un plan simplifié.png"),
    ("1_hsrTU1JUjwgB_DIz0tnBEOkceDB2mil", "Évaluation - Choisir le bon outil géométrique.png"),
    ("1dLvgBOKdjjc1aMJGbjahCe1zDs2Kevzw", "Résoudre des problèmes de synthèse — Feuille 2.png"),
    ("1xQr6XmR82eM-OkZEMC7eLe6BZBIUZVjY", "Bilan final de mathématiques CM2.png"),
    ("1nCo07bK24eNY_z-D2jxGN36BGARwT7EI", "Résoudre une enquête mathématique - Feuille 2.png"),
    ("1HAqg5wDgeMIP3cjp5ctOqvE8sJRVnlPf", "Interpréter des données — Feuille 2.png"),
    ("17ENcPD0JuDqCJ5c9E5__tOiyi4jX9G-n", "Lire un graphique simple - Feuille 1.png"),
    ("19Ijc97gcrj2SmsD8MjwdAymJPXYcPa6i", "Construire un graphique à partir d'un tableau - Feuille 1.png"),
    ("10WZOZIxcmYFFSC8HSjMGjVmpvgphE7y0", "Évaluation - Réviser les grandeurs et mesures.png"),
    ("1kmY39Cj0fi5ET4BiACE7PQjSwZItCUPb", "Résoudre des problèmes de synthèse — Feuille 1.png"),
    ("1UUpH7TvvsVumWV2Gip3z7GUntE3Pyx5K", "Construire un graphique à partir d'un tableau - Feuille 2.png"),
    ("1sjeSdP5JQUEyWF0goXT1hQk5mQb2rp3K", "Lire un graphique simple - Feuille 2.png"),
    ("16bfoj3D9Xhfja8UHGktxVCfkgaUX5z7E", "Evaluation - Interpréter des données.png"),
    ("1XwWt0nhNGsXo9JZekVplGrc0Vp8fTD0b", "Évaluation — Utiliser plusieurs outils géométriques.png"),
    ("1KFdoWl6Nd1HXFuOjFoVy8h3jKC9SLEn_", "Choisir le bon outil géométrique - Feuille 2.png"),
    ("18R3j_WbxoOF4gu0P9uILcCIBZDxSxiTO", "Évaluation - Lire et organiser des données.png"),
    ("18FqPzzJ9stusgALxM3uCpaBwdJRCvJ0b", "Choisir le bon outil géométrique - Feuille 1.png"),
    ("1t2Ft6PIfnvicMR7_Rg8pWC41dEuhxt79", "Mission finale mathématique avec Félix.png"),
    ("1VD-T_IajhVdQi_VXCjTD9KvfCwJL8I7r", "Réviser les nombres et les calculs - Feuille 2.png"),
    ("17RwmsFtkwBpS6sxU8g5wgutrEQ2xFyuW", "Évaluation - Construire un graphique à partir d'un tableau.png"),
    ("1FQeaIx2v1pkiq6Krqox00W1_t7FO-txw", "Préparer l'entrée en 6e — Feuille 2.png"),
    ("13RM1ufPtHoPqY7HHLafJWzWfiDBPU5aP", "Réviser les grandeurs et mesures - Feuille 1.png"),
    ("1B-750326uKlZaWuFCJXNQIKu77Ahy2sh", "Préparer l'entrée en 6e - Feuille 1.png"),
    ("1sUvFNBaVyS3osmdkMvzP-R4mtC7KqleS", "Dernière mission de géométrie CM2 - Feuille 2.png"),
    ("1XjKIs7Z_fc5yoWyuXzOZwIi-qmY3XXIS", "Réviser les nombres et les calculs - Feuille 1.png"),
    ("1tfB4PufERhJrIylNu1OzJz-_HGgdHf5p", "Réviser les grandeurs et mesures - Feuille 2.png"),
    ("1fBkrmRUA8UdV49jzEQhwyPP9FtkVnbCi", "Lire et organiser des données - Feuille 1.png"),
    ("1AriFqVADKm50v0qdQxdS_lZ9THnMS-La", "Mission finale mathématique avec Félix - Feuille 2.png"),
    ("1Xd1RDiO14E99nbwC4Bqn2xgQSFWaagw5", "Dernière mission de géométrie CM2 - Feuille 1.png"),
    ("163IgHCrVbSfFusWwO44zknUdICO2fwIZ", "Lire et organiser des données - Feuille 2.png"),
    ("1NpFiLEmBWLG8xzIFdI5fBcr8ZJk-8uGc", "Mission finale mathématique avec Félix - Feuille 1.png"),
    ("1qIqb6gmRanSBm1QDY0DAbi6rMNsb5cDp", "Se repérer sur un plan - Feuille 2.png"),
    # ── Page 2 ──────────────────────────────────────────────────────────────
    ("1QQQ7QkNwArPfmbh4tjAhHAIfw3jP0CKg", "Convertir des unités de durée — Feuille 2.png"),
    ("1BfVmc3qxkm3o52aFJWOYSTWQGgwgbpUQ", "Identifier et comparer des angles - Feuille 1.png"),
    ("1gnxqFHEKdJeSI56sPXAa69Rz73BAQbCY", "Lire une maquette ou un plan simplifié - Feuille 1.png"),
    ("1Ptee1Os9pHCkK8PE2tEiuBNPsgVNqZfl", "Identifier et comparer des angles - Feuille 2.png"),
    ("1I5GrvKnmtgfQ65Ts7QiO-vSoS5kn4P_q", "Vérifier la vraisemblance d'un résultat - Feuille 1.png"),
    ("1-HP5QbSYGnujQoawvYdHMQOu78LDKtbq", "Convertir des unités de masse — Feuille 2.png"),
    ("1Suhp6m_AiVvOnulRtpY59lvEwExtBRYp", "Convertir des unités de durée — Feuille 1.png"),
    ("17kcMA2lJ4h2WrA9UUBVptWMslDj--Sim", "Reconnaître et décrire des polygones - Feuille 2.png"),
    ("1fmwORXto6pA5U4MaefSotmVPO8fi8w5-", "Reconnaître le patron d'un solide - Feuille 1.png"),
    ("1EvAvfRJvtBewRS_3NG-c4q7m-vOvQXUc", "Évaluation — Reconnaître et décrire un cercle.png"),
    ("14XauW0GQt8DsOoCOouZ0X76NwZizB9qF", "Évaluation - Reconnaître le patron d'un solide.png"),
    ("1XQZd2OtP2XIVIfn9HrQnRzBGJu9GZOy8", "Agrandir ou réduire une figure — Feuille.png"),
    ("1WIzHGq8esKbuUYRtjNVfDpXIcQ2gNnz8", "Reconnaître et décrire des polygones - Feuille 1.png"),
    ("1KN9mzIGtNjB420riwhPmUdFhrrzQSVRt", "Se repérer sur un plan — Feuille 1.png"),
    ("1DfSk7w3CIySeoLu80d_Opjfv41coaU7E", "Compléter une figure par symétrie axiale - Feuille 2.png"),
    ("1Kn4YY-vRbtHwPPZcLp7q9TOy1xawCa8J", "Convertir des unités de masse - Feuille 1.png"),
    ("1qEFTrWQTPIvGO97h11lLenKaN_XXiGdW", "Mesurer un angle avec un rapporteur - Feuille 2.png"),
    ("1x11a9Kq-M0QSFHLWd3ZpVFp7dz5_tQ67", "Décrire un déplacement sur quadrillage - Feuille 2.png"),
    ("1zS_DaBQDYJWIjj6xGyFWNU3G34ZFLm89", "Résoudre des problèmes de mesures - Feuille 2.png"),
    ("1uRRuqXilj46S_e0Y1cft6BlPemhmu8_R", "Reconnaître le patron d'un solide — Feuille 2.png"),
    ("1cZG_7MQuTP_PilTtdaPFGA2AIh9VCzrW", "Compléter une figure par symétrie axiale - Feuille 1.png"),
    ("1xJO3mQ6dNLS7kCClSOTvpJcdXCqU14V1", "Évaluation — Résoudre des problèmes de durées.png"),
    ("1eqBeeWVc8m7a4JwL1hMpHc0tf-eu99K3", "Décrire un déplacement sur quadrillage - Feuille 1.png"),
    ("1ULfd_H59EGblv-e4xQuKTtGO4DrY2Sun", "Mesurer un angle avec un rapporteur - Feuille 1.png"),
    ("1XDJhWNzIvTHVHjn7ei87hF3eFR8-Uo0L", "Construire un cercle avec un compas - Feuille 1.png"),
    ("1Lzym8td0PmzUVEIQlbjb17-OfryiIi-K", "Résoudre des problèmes de mesures - Feuille 1.png"),
    ("1qzse6eBcqhLYjMNnjuRah9VwzuYia7Vd", "Décrire un déplacement sur quadrillage — Feuille 2.png"),
    ("19cxV2FSNcAY8JSYWUMAIPNf_lBSX7Tjk", "Évaluation — Convertir des unités de durée.png"),
    ("19Ck3RFXbhKGb8cDW0l8LCQLUt9QXtxkA", "Évaluation — Reconnaître et décrire des polygones.png"),
    ("1SmWT05-jxLi0SAwEl8ByUf9hDV_esqgA", "Résoudre des problèmes de durées - Feuille 1.png"),
    ("1m8Kk9V-gftfN0081V2IFQhCXWzHM6IKm", "Convertir des unités de longueur - Feuille 1.png"),
    ("1wyunOqT3y6mxeA8D0sd4rQF9evMuO0IX", "Évaluation — Mesurer un angle avec un rapporteur.png"),
    ("1J6XpgrKNpo7EWq2yKW4X-toNrsY1cEhJ", "Résoudre des problèmes de durées - Feuille 2.png"),
    ("1GggdPP8kP35OpX87uwCSwu5h-W6BaOaz", "Évaluation - Identifier et comparer des angles.png"),
    ("1lVAexrjsNAK0WQjAbauDMUNrPq-DCAww", "Convertir des unités de longueur - Feuille 2.png"),
    ("1Wf3A4JZJVaSRYih9FjdUoVbwx1v763Pv", "Se repérer dans un espace réel — Feuille 2.png"),
    ("101cce676zoPVGO1s13ek0xykliTcmvdt", "Évaluation — Convertir des unités de longueur.png"),
    ("1X8Vz8VFkrrPEgLn9qO4zlRB-K62NRj3o", "Se repérer dans un espace réel - Feuille 1.png"),
    ("19R1wU_BcIPCzlE8olcx61cHFhiLb4od-", "Évaluation — Construire un triangle à partir de mesures.png"),
    ("1j9uZkCD-J-Kh6CgjJ85TWlXfzVspKhsg", "Évaluation - Lire un programme de construction.png"),
    ("1YvaKQrR4_B9giScbRnJjlo7jaG77zcs0", "Agrandir ou réduire une figure.png"),
    ("1Rs963D4_M8WtlI40GupoLbwXuvjp_QaA", "Choisir les bonnes opérations - Feuille 2.png"),
    ("1xhAHjOZCcmZ_lgmk1KyRGDzf6uT_1uoS", "Évaluation — Résoudre des problèmes de mesures.png"),
    ("1tCvqwTEXn4wyN__hTDpGygtrRyTYE9F3", "Évaluation — Compléter une figure par symétrie axiale.png"),
    ("1Wo2c6i0l9n3odwtQH-zsJOWQIsro_Gsr", "Lire un programme de construction - Feuille 2.png"),
    ("1Q9rTR-SNpu-fPRrj3goomgD3919rUahN", "Évaluation - Se repérer sur un plan.png"),
    ("1f22GqsXWRGLrxCiEDpxDkBvHJLaqXjHy", "Construire un carré et un rectangle - Feuille 1.png"),
    ("1YuBiqrSXHwFFr9uVQSDFCeNFsxA92DUu", "Évaluation — Reconnaître une situation de symétrie axiale.png"),
    ("16Yjj5i0Q_-Dh_KySz-4ss_btB2wM1Ew5", "Évaluation — Convertir des unités de masse.png"),
    ("15k1Q8PhLxtZMLIWv7dHvuAo5q_tlN8Oh", "Construire un cercle avec un compas — Feuille 2.png"),
    ("1RBjrZTB6LW1gHq_mn2Jh6mFgdVywcMjX", "Construire un carré et un rectangle - Feuille 2.png"),
    ("1PBfCFwVwXj66ypQVuZoPFOM6EJmZH9LL", "Lire l'heure et comprendre les durées - Feuille 1.png"),
    ("1DXwSKljML4hBdTTTRlQtAFoG_gOg3irG", "Reconnaître et décrire un cercle - Feuille 2.png"),
    ("1Bbm_2ynlPgPpTwn488V73g4XED_UL8XA", "Évaluation — Rédiger un programme de construction.png"),
    ("12NRb7HzQP4Qrm7ZX8THOU-_dBnqJ9hvL", "Rédiger un programme de construction - Feuille 1.png"),
    ("1BSiXrtsYxGa9pwnDJXFLka6hGno-TEl3", "Agrandir ou réduire une figure - Feuille 1.png"),
    ("1gpWXqc8KFkyGLj67RL_OOjW4-wqmkgsy", "Évaluation - Convertir des unités de contenance.png"),
    ("19RH5HtMfqScrIeeVy1Lme3hRwJgUIE0A", "Utiliser le vocabulaire de position - Feuille 2.png"),
    ("1imQ99JUyntb00mxx3YPydKms5HrrlPjo", "Lire l'heure et comprendre les durées - Feuille 2.png"),
    ("1_5lJFLVIAkdDRYQHfjjdmXROmVY5l7od", "Évaluation — Lire l'heure et comprendre les durées.png"),
    ("1cPRXv3hfz5LXGX1rUBIiSAmwxHG7V_rz", "Reconnaître et décrire des solides - Feuille 2.png"),
    ("1nnpQzYxqu6_4DUOtyhohAjgHEteShlug", "Rédiger un programme de construction - Feuille 2.png"),
    ("1qlc8ZPhQyBxvPcSwOiX5ZtFpcbgl4haU", "Lire un programme de construction - Feuille 1.png"),
    ("1aPlaHyWEXK4nekkjLWrrKPHoG5IW8EER", "Construire un angle avec un rapporteur - Feuille 1.png"),
    ("1hesnV72Fgt-iI5ADPjBUfwDKVH5BdQco", "Convertir des unités de contenance - Feuille 2.png"),
    ("11LTqUl-6gwwIAdIGf-39zJsx9wznZNxM", "Évaluation - Reconnaître et décrire des solides.png"),
    ("1gGw5YIm1D9RcL_jISRKtQv0NBvVOWcHw", "Reproduire une figure géométrique - Feuille 2.png"),
    ("1gpIeLDvUdO8jOx0pZAGlo6t5bANTTf-C", "Construire un triangle à partir de mesures - Feuille 2.png"),
    ("1RU7k85hLOhCZ9ZbAEQMOYWMdwT3UDdYk", "Reconnaître une situation de symétrie axiale - Feuille 2.png"),
    ("1CEW8hZnxF3gN70DYMI12oDWW2v7pG2fl", "Reconnaître et décrire des triangles - Feuille 1.png"),
    ("1PncRHlkokcsXIwyfn6ri7FxvGCuvRA45", "Convertir des unités de contenance - Feuille 1.png"),
    ("1kQlOfyRHL8Sdes34sSwMeZGMtxHxVhKa", "Évaluation - Quadrilatères particuliers.png"),
    ("17yrxbSGeGNX2mO7T2ArPp2fT8accgT0g", "Reproduire une figure géométrique - Feuille 1.png"),
    ("1XZCbV5mBCNhXQQHB-rBVUiPD-GMBGi9Z", "Évaluation — Reproduire une figure géométrique.png"),
    ("1VePsMHhjCSzxWGC5vCpyJ1znO9X6ZkWA", "Construire un triangle à partir de mesures - Feuille 1.png"),
    ("13x44jbA5ufzu8DfSfs91BOLPohi36Yvx", "Reconnaître une situation de symétrie axiale - Feuille 1.png"),
    ("1uwpl7JaciDN-AQ9pfnTWOL-m-8jgE1SB", "Évaluation — Construire un cercle avec un compas.png"),
    ("18ygOizVvW0z26FwduEpziG_CrbLrBTQl", "Évaluation — Construire un carré et un rectangle.png"),
    ("1DYuNwgG4BL1Ehcaup7H9r4IH83_0Ftdq", "Reconnaître et décrire des triangles - Feuille 2.png"),
    # ── Page 3 ──────────────────────────────────────────────────────────────
    ("1G3pBwVYPvGFJ1EuIEJh6BlZZ4ueY5Q38", "Évaluation - Problèmes avec des fractions simples.png"),
    ("1vrocRlM1ceBZhxg98Mwyf0zB-fzs9J5e", "Se repérer sur un plan quadrillé - Feuille 1.png"),
    ("1RdlJMRmppqsgBKuXglsjQa4no-XoMTBV", "Évaluation — Rédiger une réponse mathématique complète 2.png"),
    ("1ClVNzlLj1uw2Xm3ROpc8qSG-Nkb2slv1", "Évaluation - Organiser des données dans un tableau.png"),
    ("14VzQ_REM0ccdVEuqYtWxceDcTOvpD7jT", "Construire un graphique en barres - Feuille 2.png"),
    ("1ih2U_1Yy45ZrA2tbq9EtGmZx5hLcQ8Ej", "Évaluation - Problèmes avec des nombres décimaux.png"),
    ("1J2EGT2pEf6OetsMgZ0h8Iw4WFt7yU9eA", "Évaluation — Problèmes d'aire avec conversions simples.png"),
    ("11vH6j1L635sfJf39HjOa4hWly1MV0ZBF", "Choisir les bonnes opérations - Feuille 2b.png"),
    ("1huIBDxnqgTMimzuqbm6btxDGJPQA-1ct", "Choisir les bonnes opérations - Feuille 1.png"),
    ("1yCDSjB3OceK5rgMeupzeLTAoZg9dzGgo", "Problèmes d'aire avec conversions — Feuille 2.png"),
    ("1x9AscBBw7p0w34qBIG9gxX-BVFMkG8Vf", "Résoudre des problèmes d'aire avec conversions simples.png"),
    ("1Nrv-RCElQRFc52jXACJOld6M6vG0Ffnh", "Problèmes avec une moyenne simple - Feuille 2.png"),
    ("1rbEBozo4Giji3vm17v7sW0mgHUHoWN6l", "Rédiger une réponse mathématique complète - Feuille 1b.png"),
    ("1j6cbwP7S_GHGCSkOHtPyT-IuNpc1D_17", "Problèmes avec des fractions simples - Feuille 2.png"),
    ("1d4Lmd192ymzEbI7uybG2r-0eKkokBL6D", "Vérifier la vraisemblance d'un résultat - Feuille 2.png"),
    ("1Pw95FJPaoJY5JWyuuKPGnEk4VRS0LFnb", "Évaluation — Construire un graphique en barres.png"),
    ("1pRor-MkFmJjGd1cIvp2b-fp5ULS1nUy7", "Utiliser un tableau pour résoudre un problème - Feuille 1.png"),
    ("1_drWBuVjdnCR1wMVN2kx0crDUcG_aTWy", "Rédiger une réponse mathématique complète - Feuille 1.png"),
    ("1fwQqd0DZSeF0KgQeRR1J9OQvteOLHQmL", "Évaluation - Tracer des droites parallèles.png"),
    ("1m5cJabyicOMi5Xx_jmqpCFK5x2Ge7sqe", "Organiser des données dans un tableau - Feuille 2.png"),
    ("1CuyS0TN-XR5yKPoeW6BBCwrwu_6R-jbT", "Évaluation — Lire un graphique simple.png"),
    ("1sm_OUhMB6piOJxim67zmn1bMf6q0NRGK", "Evaluation - Droites perpendiculaires et parallèles.png"),
    ("1XzQGGzHeBKmbz5XPN6gXtmY8h8J_aOHY", "Lire un tableau à double entrée - Feuille 1.png"),
    ("1vLzfu7xtwLfuexLJCYjtoyRL4-5_bdfW", "Utiliser un tableau pour résoudre un problème - Feuille 2.png"),
    ("10gS13hMtz3gXa3rPfEAuXsJ8U4MSsJjC", "Rédiger une réponse mathématique complète - Feuille 3.png"),
    ("1U4wQNmSB26AJPs7Z1k7JZHfCqwBCzwfb", "Rédiger une réponse mathématique complète - Feuille 2.png"),
    ("1mvOfxQZKiGzxVag_B7C6fh8iJIvLYt8Y", "Évaluation - Vérifier la vraisemblance d'un résultat.png"),
    ("1M3oP-E0G_1jLK3qALC_tYyQ_Md9Isrrc", "Organiser des données dans un tableau - Feuille 1.png"),
    ("14GQnPALNUx6gmZ1W_uEjWcSjCP5I4alN", "Évaluation - Comprendre la moyenne simple.png"),
    ("10nd05IOA_1hFQd3YBLLtmvlKXdq9AVRW", "Lire un tableau à double entrée - Feuille 2.png"),
    ("1ToXL8vci32rPBCFCkZPHqfyPinekJ3vK", "Évaluation — Estimer l'ordre de grandeur d'un résultat.png"),
    ("1-R5mUAmRc2paZ7VlXh1D-nR591534xtc", "Résoudre des problèmes à plusieurs étapes avec des données - Feuille 1.png"),
    ("1PYbZ6QIqh2XTEvrDHQI4Ht3r7FUhKJis", "Estimer l'ordre de grandeur d'un résultat — Feuille 2.png"),
    ("1eOaX59-49z9l7Tt8Bg9csazWR5xvF_2v", "Présenter clairement sa démarche de résolution — Feuille 1.png"),
    ("1U9ZIfwe9T-EL6X7MhXUKzMtDZWL4qF0f", "Utiliser un schéma pour résoudre un problème — Feuille 2.png"),
    ("1w5DTScMcnNIJv4N9_Hkk0GX12WSmGi7l", "Droites perpendiculaires et parallèles — Feuille 2.png"),
    ("1IK-BwUZIWxZiEqCNUcKHiBUJvFWymqPO", "Utiliser un schéma pour résoudre un problème - Feuille 1.png"),
    ("1zN6nvVXyI2qVgxG1fKiLVvmJs7VxDlY5", "Évaluation — Utiliser un tableau pour résoudre un problème.png"),
    ("12UzyNp4T9GccI5SZOhFAreOoA-ojzjur", "Résoudre un problème avec des fractions simples - Feuille 1.png"),
    ("1BhKN88yf6Q36oGX5kGN6TCJ8E1rkjTHG", "Évaluation — Convertir des unités d'aire simples.png"),
    ("1vhMYqymQkGkLPVOY0X_Za3GS_w9hPTw0", "Tracer des droites perpendiculaires - Feuille 1.png"),
    ("1tySquUs0sASDkIouKjGwfkS3ZEy-PtMx", "Résoudre un problème de proportionnalité - Feuille 1.png"),
    ("1Ppn3iJNfpEJJDHmmOF6IYs4HXFam08_K", "Tracer des droites perpendiculaires - Feuille 2.png"),
    ("1MzbL4v9M7mPx25dsaWdb0_S5WaFPjEHu", "Résoudre un problème avec des nombres décimaux - Feuille 1.png"),
    ("1dzLdjsDbbtF5_kMnsYdL-zekPR-GPSRn", "Résoudre des problèmes avec une moyenne simple - Feuille 1.png"),
    ("15J1pxJbrC3XhAxSKreCrJp_9_qiyZLXX", "Évaluation - Lire et utiliser un tableau de données.png"),
    ("1Hr66iKC8SRHO8apZl9V-SUaPyy3iQpTh", "Problèmes d'aire avec conversions simples - Feuille 1.png"),
    ("1kSpc8BdenmHhwncQTq4MSpRKuxpa3uBT", "Se repérer sur un plan quadrillé — Feuille 2.png"),
    ("1BQ9JearXjzT2yIrqk9CUvqRPc5mDv3Iq", "Problèmes d'aire avec conversions simples - Feuille 2.png"),
    ("1_Yq7neVX8QvR8P3ISbPWubZcaN1FYYMJ", "Vérifier la vraisemblance d'un résultat - Feuille 1b.png"),
    ("1DdEGOCE8RQmZzbe-azGgW6yQNXd4XJjA", "Évaluation — Utiliser un schéma en barres.png"),
    ("1siBwg1-P3I_hmjnyCbQx1Vx7XF1aLXSO", "Évaluation - Se repérer sur un plan quadrillé.png"),
    ("13cXW5KcstKdAC6USzKv7h_xm4pzopOaP", "Évaluation — Problèmes avec une moyenne simple.png"),
    ("1mFPtxZcsiaSssg9Fa-oyT7lRs1BeCxuS", "Tracer des droites parallèles - Feuille 1.png"),
    ("1JbGnJWj1TVlHjnD9LLkHb0CQePNdV1TP", "Évaluation — Rédiger une réponse mathématique complète.png"),
    ("1lwzoAWUlNrG6glEvCQhowQCHb-ehYmrh", "Lire et construire des graphiques simples — Feuille 1.png"),
    ("1jx_rkKXJ_VxkX3cD6eOfVUvWRziiAvuc", "Choisir les bonnes opérations - Feuille 3.png"),
    ("1Ouwkv0KjPN28sjCI8-OYwVtSM8Q-W2PV", "Problèmes à plusieurs étapes avec des données - Feuille 2.png"),
    ("1B6cTjFR9BjE-QYdUoAxVaP6MwGiUyNML", "Problèmes de proportionnalité — Feuille 2.png"),
    ("1vF1bT103MNg_d_Q2qHAW00G0_AQUNX2P", "Lire et construire des graphiques simples - Feuille 2.png"),
    ("1SHupbxrgQ9Vsh8qTvrt6U-Ki-XCeD4-N", "Construire un graphique en barres - Feuille 2.png"),
    ("15IjxyQKh0spE-FhmZC1dvBWKmDUym_TF", "Tracer des droites parallèles — Feuille 2.png"),
    ("1e1m87V0HcVIJDp2BlmHBxbhU5TCs8FaH", "Problèmes avec des nombres décimaux - Feuille 2.png"),
    ("1tvn8Sgm2BSgCzJh7vLOcycmRZGqkE5OE", "Utiliser un schéma en barres - Feuille 2.png"),
    ("1ZVDXuIy3QACKXssCYVTbZW8nv3-o1ZbC", "Choisir les bonnes opérations.png"),
    ("1zeiE1Rb4o53JKIkEyiH94G0qcvCZfd0k", "Présenter clairement sa démarche — Feuille 2.png"),
    ("1JiDU9Kj47TRWSMU3AoF30owIWTD2Wy3b", "Évaluation - Problèmes de proportionnalité.png"),
    ("1v7zcUo3ht1ud3hQbkkehQFRBVmTvvNUT", "Évaluation - Problèmes à plusieurs étapes.png"),
    ("1mxUPEE49VGtWPJxOMw-AuYNi_R2Gnnlt", "Évaluation — Présenter clairement sa démarche.png"),
    ("1j7gqUuzG7J7JNWm08oDC6vS1Y8AkFtDd", "Utiliser un schéma en barres pour résoudre un problème — Feuille 1.png"),
    ("1uThk4RKMX4N6gf1SqvTm68S2hRDPFCBf", "Évaluation - Tracer des droites perpendiculaires.png"),
    ("1Y0FhaR-mjgN5NKrWBdl7jSJHIi0FhGAB", "Lire et utiliser un tableau de données - Feuille 2.png"),
    ("12Pke8ltOYFgaYEk6pT-Ge6p5ugMu-ERS", "Estimer l'ordre de grandeur d'un résultat - Feuille 1.png"),
    ("1449mjMYQNsG5PoTKuFzz-KDOiMwizKvz", "Lire et utiliser un tableau de données - Feuille 1.png"),
    ("1QMdDIQQxjv8loNMATtoMjbPnDrk9FB-K", "Comprendre la moyenne simple - Feuille 1.png"),
    ("17KmvP3N5oYbJIlTNfVFwZdEt0bQf5458", "Évaluation - Lire un tableau à double entrée.png"),
    ("1Ys7A75HPvrUcC2CPPxob49ooamnygSze", "Évaluation - Utiliser un schéma pour résoudre un problème.png"),
    ("1Qo4OxaVPHed_l0g1djqCGv_QESuTyhcO", "Vérifier la vraisemblance d'un résultat.png"),
    ("1CbZ3loYXnjWsqiq_6EfcXtBezy3JncIW", "Évaluation — Problèmes d'aire avec conversions simples 2.png"),
    ("1xhxcsTsPEYODIyV8JoCI4us2E1IDO4FWU", "Convertir des unités d'aire simples - Feuille 2.png"),
    ("1muh_fRuhjzT7_HLdKnM_Vw8Pu5wInU5T", "Connaître les unités d'aire.png"),
    ("1sg1yO0BOPUp4mPCK97fiYTisLJ1FL5sS", "Évaluation - Distinguer aire et périmètre.png"),
    ("1ksHT1cBSSPGEhbeBNBLclVe8lWuEHzJD", "Connaître les unités d'aire - Feuille 2.png"),
    ("12fhC_zJ_0qxFD72MyikFcvOqW139hHZd", "Distinguer aire et périmètre.png"),
    ("1GBocJ97OsQ4nBP1eqNH2l1y5sEUz21cl", "Évaluation - Aire du carré et du rectangle.png"),
    ("19IxiCpyImguGno82VMUatf4uXxK0TiSr", "Calculer l'aire d'un carré et d'un rectangle avec une formule.png"),
    ("1dNtLRv8JRMdjS_pXXsEamIdD-9OcWOhV", "Distinguer aire et périmètre - Feuille 2.png"),
    ("1A8-KiAJmx62Tn6wnaVlqHuO1zxkEHei8", "Périmètre du carré et du rectangle - Feuille 2.png"),
    ("1-1uEAcdZ-FV-uztzhXipaTaNxxqZEWt8", "Utiliser les pourcentages dans des situations-problèmes — Feuille 2.png"),
    ("1dwtSdq59BwADGyuJnsJqQHfVUs2F2OF4", "Résoudre un problème de proportionnalité par passage à l'unité.png"),
    ("1ZAMw0CTxT3ZM5oaK0SZvZIfZ29H0WxqI", "Aire du carré et du rectangle - Feuille 2.png"),
    ("1Ssq_nkAhajFBjB951FS2U2T_eg5IKdL-", "Utiliser un tableau de proportionnalité.png"),
    ("1DZ7OHCj5MpkEuPKwxwZc64rwGNodZozw", "Reconnaître une situation de proportionnalité - Feuille 2.png"),
    ("17MO9edE2F-8m-b0j4GwdLv4kUo6Esu_L", "Résoudre des problèmes avec des nombres décimaux.png"),
    ("1oYdZfB29aO89qzmp4tfPSC6kvJuDL-6y", "Calculer un pourcentage simple d'une quantité - Feuille 2.png"),
    ("1fCrwQk1-whgvb0LDvFFfJWxgZzshwNTz", "encadrer-nombres-decimaux-consolidation.png"),
    ("1Nd1t-8Max1UYdoDd9mRKPycoR7XCUBQk", "Évaluation - Comprendre la notion d'aire.png"),
    ("1b03t1q-tL72ZTNND2ut5M0cHFbc7Bbfe", "Passer une fraction à un nombre décimal - évaluation.png"),
]


def slugify(text: str) -> str:
    """Convertit un titre français en slug ASCII."""
    replacements = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'à': 'a', 'â': 'a', 'ä': 'a',
        'î': 'i', 'ï': 'i',
        'ô': 'o', 'ö': 'o',
        'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c', 'œ': 'oe', 'æ': 'ae',
        'É': 'e', 'È': 'e', 'Ê': 'e',
        'À': 'a', 'Â': 'a',
        'Î': 'i', 'Ô': 'o',
        'Ù': 'u', 'Û': 'u',
        'Ç': 'c',
        "'": '-', "'": '-', '—': '-', '–': '-',
        'l\'': 'l-', 'd\'': 'd-',
    }
    result = text.lower()
    for src, dst in replacements.items():
        result = result.replace(src, dst)
    result = re.sub(r'[^a-z0-9]+', '-', result)
    result = re.sub(r'-+', '-', result).strip('-')
    return result


def parse_title(title: str):
    """
    Parse un titre de fichier PNG et retourne (notion_title, notion_slug, sheet_key).
    sheet_key: 'f1', 'f2', ou 'f3'
    Retourne None si le fichier ne correspond pas au pattern f1/f2/f3.
    """
    # Supprimer l'extension .png
    name = re.sub(r'\.png$', '', title, flags=re.IGNORECASE).strip()

    # Pattern Évaluation → f3
    eval_match = re.match(
        r'^[ée]valuation[\s\-—–]+(.+)$', name, re.IGNORECASE
    )
    if eval_match:
        notion = eval_match.group(1).strip()
        # Nettoyer les suffixes parasites
        notion = re.sub(r'\s*\d+$', '', notion).strip()
        return notion, slugify(notion), 'f3'

    # Pattern "NOTION - Feuille 1" → f1
    f1_match = re.match(
        r'^(.+?)\s*[\-—–]+\s*[Ff]euille\s+1(?:[:\s].+)?$', name
    )
    if f1_match:
        notion = f1_match.group(1).strip()
        return notion, slugify(notion), 'f1'

    # Pattern "NOTION - Feuille 2" → f2
    f2_match = re.match(
        r'^(.+?)\s*[\-—–]+\s*[Ff]euille\s+2(?:[:\s].+)?$', name
    )
    if f2_match:
        notion = f2_match.group(1).strip()
        return notion, slugify(notion), 'f2'

    return None  # Fichier non mappable


def download_file(file_id: str, dest_path: Path, session: requests.Session):
    """Télécharge un fichier depuis Google Drive (dossier public)."""
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    resp = session.get(url, allow_redirects=True, timeout=30)
    if resp.status_code != 200:
        raise RuntimeError(f"HTTP {resp.status_code} pour {file_id}")
    # Google Drive peut retourner une page HTML pour les gros fichiers
    if b'<html' in resp.content[:100]:
        # Chercher le lien de confirmation
        confirm_match = re.search(rb'confirm=([0-9A-Za-z_]+)', resp.content)
        if confirm_match:
            confirm = confirm_match.group(1).decode()
            url2 = f"https://drive.google.com/uc?export=download&confirm={confirm}&id={file_id}"
            resp = session.get(url2, allow_redirects=True, timeout=30)
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    dest_path.write_bytes(resp.content)


def png_to_pdf(png_path: Path, pdf_path: Path):
    """Convertit un PNG en PDF A4 portrait via img2pdf."""
    # img2pdf gère le placement automatique
    a4 = (img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297))
    layout = img2pdf.get_layout_fun(a4)
    pdf_bytes = img2pdf.convert(str(png_path), layout_fun=layout)
    pdf_path.write_bytes(pdf_bytes)


def main():
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})

    registry = {}  # notion_slug → {title, f1_png, f1_pdf, f2_png, f2_pdf, f3_png, f3_pdf}
    skipped = []

    print(f"Téléchargement de {len(FILES)} fichiers PNG…\n")

    for file_id, title in FILES:
        parsed = parse_title(title)
        if parsed is None:
            skipped.append(title)
            print(f"  IGNORÉ : {title}")
            continue

        notion_title, notion_slug, sheet = parsed

        # Init registry entry
        if notion_slug not in registry:
            registry[notion_slug] = {'title': notion_title, 'domain': ''}

        png_dest = BASE_DIR / notion_slug / f"{sheet}.png"
        pdf_dest = BASE_DIR / notion_slug / f"{sheet}.pdf"

        # Télécharger PNG
        if png_dest.exists():
            print(f"  OK (cache) : {notion_slug}/{sheet}.png")
        else:
            try:
                print(f"  ↓ {notion_slug}/{sheet}.png  ← {title[:60]}")
                download_file(file_id, png_dest, session)
                time.sleep(0.3)  # Rate limiting
            except Exception as e:
                print(f"  ERREUR : {e}")
                continue

        # Générer PDF
        if not pdf_dest.exists():
            try:
                png_to_pdf(png_dest, pdf_dest)
                print(f"  ✓ PDF généré : {notion_slug}/{sheet}.pdf")
            except Exception as e:
                print(f"  ERREUR PDF : {e}")

        registry[notion_slug][f"{sheet}_png"] = f"/fiches/cm2/mathematiques/{notion_slug}/{sheet}.png"
        registry[notion_slug][f"{sheet}_pdf"] = f"/fiches/cm2/mathematiques/{notion_slug}/{sheet}.pdf"

    # Sauvegarder le registre JSON
    reg_path = Path(__file__).parent.parent / "content" / "cm2-fiches-maths-registry.json"
    reg_path.write_text(json.dumps(registry, indent=2, ensure_ascii=False))
    print(f"\n✓ Registre JSON sauvegardé : {reg_path}")

    if skipped:
        print(f"\nFichiers ignorés ({len(skipped)}) :")
        for s in skipped:
            print(f"  - {s}")

    print(f"\n✓ Terminé. {len(registry)} notions dans le registre.")


if __name__ == "__main__":
    main()
