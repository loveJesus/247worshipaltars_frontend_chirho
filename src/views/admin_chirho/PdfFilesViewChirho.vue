<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">PDF Files Management</h1>
    
    <!-- Upload Section -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Upload New PDF</h2>
      <form @submit.prevent="uploadPdfFileChirho" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">File</label>
          <input
            type="file"
            accept=".pdf"
            @change="handleFileChangeChirho"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="newPdfFileChirho.description_chirho"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            v-model="newPdfFileChirho.is_public_chirho"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label class="ml-2 block text-sm text-gray-700">Make this file public</label>
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="isUploadingChirho"
        >
          {{ isUploadingChirho ? 'Uploading...' : 'Upload PDF' }}
        </button>
      </form>
    </div>

    <!-- Files List -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">PDF Files</h2>
      <div v-if="isLoadingChirho" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
      <div v-else-if="pdfFilesChirho.length === 0" class="text-center py-4 text-gray-500">
        No PDF files uploaded yet.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="file in pdfFilesChirho"
          :key="file.pdf_file_id_chirho"
          class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">{{ file.file_name_chirho }}</h3>
              <p class="text-sm text-gray-500">{{ file.description_chirho }}</p>
              <div class="mt-2">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    file.is_public_chirho
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ file.is_public_chirho ? 'Public' : 'Private' }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="viewPdfFileChirho(file)"
                class="text-blue-600 hover:text-blue-800"
              >
                View
              </button>
              <button
                @click="deletePdfFileChirho(file.pdf_file_id_chirho)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Viewer Modal -->
    <div
      v-if="selectedPdfFileChirho"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closePdfViewerChirho"
    >
      <div class="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-medium">{{ selectedPdfFileChirho.file_name_chirho }}</h3>
          <button
            @click="closePdfViewerChirho"
            class="text-gray-500 hover:text-gray-700"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 p-4 overflow-hidden">
          <iframe
            :src="pdfViewerUrlChirho"
            class="w-full h-full border-0"
            title="PDF Viewer"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import type { PdfFileChirho } from '@/types_chirho'

const toast = useToast()

interface NewPdfFileChirho {
  file: File | null
  description_chirho: string
  is_public_chirho: boolean
}

const pdfFilesChirho = ref<PdfFileChirho[]>([])
const isLoadingChirho = ref(false)
const isUploadingChirho = ref(false)
const selectedPdfFileChirho = ref<PdfFileChirho | null>(null)
const newPdfFileChirho = ref<NewPdfFileChirho>({
  file: null,
  description_chirho: '',
  is_public_chirho: false
})

const pdfViewerUrlChirho = ref('')

const loadPdfFilesChirho = async () => {
  isLoadingChirho.value = true
  try {
    const response = await fetch('/api_chirho/admin_chirho/pdf_files_chirho')
    if (!response.ok) throw new Error('Failed to load PDF files')
    pdfFilesChirho.value = await response.json()
  } catch (error) {
    toast.error('Failed to load PDF files')
    console.error('Error loading PDF files:', error)
  } finally {
    isLoadingChirho.value = false
  }
}

const handleFileChangeChirho = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    newPdfFileChirho.value.file = input.files[0]
  }
}

const uploadPdfFileChirho = async () => {
  if (!newPdfFileChirho.value.file) {
    toast.error('Please select a file to upload')
    return
  }

  isUploadingChirho.value = true
  const formData = new FormData()
  formData.append('file', newPdfFileChirho.value.file)
  formData.append('file_name', newPdfFileChirho.value.file.name)
  formData.append('description', newPdfFileChirho.value.description_chirho)
  formData.append('is_public', String(newPdfFileChirho.value.is_public_chirho))

  try {
    const response = await fetch('/api_chirho/admin_chirho/pdf_files_chirho', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Failed to upload PDF file')
    
    toast.success('PDF file uploaded successfully')
    await loadPdfFilesChirho()
    
    // Reset form
    newPdfFileChirho.value = {
      file: null,
      description_chirho: '',
      is_public_chirho: false
    }
  } catch (error) {
    toast.error('Failed to upload PDF file')
    console.error('Error uploading PDF file:', error)
  } finally {
    isUploadingChirho.value = false
  }
}

const deletePdfFileChirho = async (pdfFileIdChirho: string) => {
  if (!confirm('Are you sure you want to delete this PDF file?')) return

  try {
    const response = await fetch(`/api_chirho/admin_chirho/pdf_files_chirho/${pdfFileIdChirho}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error('Failed to delete PDF file')
    
    toast.success('PDF file deleted successfully')
    await loadPdfFilesChirho()
  } catch (error) {
    toast.error('Failed to delete PDF file')
    console.error('Error deleting PDF file:', error)
  }
}

const viewPdfFileChirho = (file: PdfFileChirho) => {
  selectedPdfFileChirho.value = file
  pdfViewerUrlChirho.value = `/api_chirho/public_chirho/pdf_files_chirho/${file.pdf_file_id_chirho}`
}

const closePdfViewerChirho = () => {
  selectedPdfFileChirho.value = null
  pdfViewerUrlChirho.value = ''
}

onMounted(() => {
  loadPdfFilesChirho()
})
</script> 