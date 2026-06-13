import os
from google import genai
from google.genai import types

# Kelas untuk menangani permintaan informasi menggunakan Gemini AI
class GeminiExpert:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def get_insect_info(self, insect_name: str) -> str:
        prompt = f"""
        Berdasarkan hasil identifikasi gambar, serangga ini terdeteksi sebagai: "{insect_name}".
        
        Tolong berikan informasi taksonomi secara ringkas, padat, dan jelas menggunakan format poin-poin (bullet list) untuk menghemat ruang. Jangan menggunakan paragraf yang panjang.
        Sertakan persis informasi berikut dengan format Markdown:
        
        *   **Nama Ilmiah:** 
        *   **Nama Umum:** 
        *   **Genus & Spesies:** 
        *   **Famili & Ordo:** 
        *   **Habitat:** (Maksimal 1-2 kalimat pendek)
        *   **Dampak Lingkungan/Pertanian:** (Hama/predator/penyerbuk? Maksimal 1-2 kalimat pendek)
        *   **Fun Fact:** (1 fakta paling unik secara singkat)
        
        Berikan jawaban langsung, hindari spasi baris ganda (double spasi) berlebihan, dan tanpa basa-basi pengantar/penutup.
        """
        
        # Menyiapkan konten input untuk model AI
        contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
                
        # Konfigurasi proses generasi AI dengan Google Search Grounding
        generate_content_config = types.GenerateContentConfig(
            temperature=0.7,
            tools=[{"google_search": {}}]
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

