import os
from google import genai
from google.genai import types

# Kelas untuk menangani permintaan informasi menggunakan Gemini AI
class GeminiExpert:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def get_insect_info(self, insect_name: str) -> str:
        prompt = f"""
        Berdasarkan hasil identifikasi gambar, serangga ini adalah "{insect_name}".
        Tolong berikan informasi detail dengan format yang rapi dan menarik:
        - Nama Ilmiah:
        - Nama Umum:
        - Spesies:
        - Genus:
        - Famili:
        - Habitat:
        - Fun Fact: (Berikan 1 atau 2 fakta unik yang jarang diketahui)
        
        Berikan jawaban langsung tanpa basa-basi pengantar.
        """
        
        # Menyiapkan konten input untuk model AI
        contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
                
        # Konfigurasi proses generasi AI
        generate_content_config = types.GenerateContentConfig(
            temperature=0.7
        )
        
        # Menghasilkan respons secara streaming
        result_text = ""
        for chunk in self.client.models.generate_content_stream(
            model="gemini-2.5-flash-lite", # Model version yang digunakan
            contents=contents,
            config=generate_content_config,
        ):
            # Menggabungkan setiap potongan teks respons
            if text := chunk.text:
                result_text += text

        # Mengembalikan hasil akhir respons AI   
        return result_text 

