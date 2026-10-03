# Terreno da hero

Gera `public/hero/terrain.png`, `public/hero/contours.svg` e
`src/components/hero/terrain-data.json` a partir de AWS Terrain Tiles (SRTM).

Requer Python 3 com `numpy`, `pillow`, `scipy`, `matplotlib` e `contourpy`.
Rodar nesta pasta, em ordem:

```sh
python3 fetch.py   # baixa 4×4 tiles z13 em volta do ponto escolhido
python3 flow.py    # preenche depressões e calcula acumulação de fluxo (rios)
python3 river.py   # traça o rio principal
python3 export.py  # recorta, desenha o imóvel e grava os arquivos
cp terrain.png contours.svg ../../public/hero/
cp terrain.json ../../src/components/hero/terrain-data.json
```

Para trocar de região, mude o ponto em `fetch.py`, a linha usada para achar o
rio em `river.py` e os vértices (`fence`, `rl`) e o recorte (`CX`, `CY`) em
`export.py`. Coordenadas desses vértices estão em pixels do mosaico baixado.
