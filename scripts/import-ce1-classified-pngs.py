#!/usr/bin/env python3

from pathlib import Path
from PIL import Image

SOURCE = Path("/Users/swann/Desktop/CE1 - QUATREMAIRE")
DESTINATION = Path("public/fiches/ce1/francais/etude-de-la-langue/evaluations")

RESOURCES = (
    (
        SOURCE / "01_FRANÇAIS/01_FRANCAIS_Sequence_198_Sequence.png",
        DESTINATION / "ce1-francais-pluriel-regulier-evaluation.pdf",
    ),
    (
        SOURCE / "01_FRANÇAIS/01_FRANCAIS_Sequence_203_Sequence.png",
        DESTINATION / "ce1-francais-reconnaitre-nom-evaluation.pdf",
    ),
    (
        SOURCE / "02_MATHÉMATIQUES/02_MATHEMATIQUES_Sequence_180_Sequence.png",
        DESTINATION / "ce1-francais-nom-commun-propre-evaluation.pdf",
    ),
)


def convert(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image.convert("RGB").save(destination, "PDF", resolution=150.0)


for source, destination in RESOURCES:
    convert(source, destination)
    print(f"{source} -> {destination}")
