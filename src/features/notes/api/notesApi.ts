import { apiClient } from '../../../infrastructure/api/client';
import { Subject, NoteResource, ResourceType } from '../types/notes.types';
import { MOCK_SUBJECTS, MOCK_RESOURCES } from './notesData';

export interface QueryNotesParams {
  semester?: number;
  branchCode?: string;
  schemeYear?: string;
  subjectCode?: string;
  search?: string;
  format?: string;
  page?: number;
  limit?: number;
}

const normalizeBranch = (branch?: string): string | undefined => {
  if (!branch) return undefined;
  const b = branch.toUpperCase();
  if (b.includes('COMPUTER') || b.includes('CSE') || b === 'CS') return 'CSE';
  if (b.includes('ELECTRONICS') || b.includes('ECE')) return 'ECE';
  if (b.includes('INFORMATION') || b.includes('ISE')) return 'ISE';
  if (b.includes('MECHANICAL') || b.includes('ME')) return 'ME';
  if (b.includes('CIVIL') || b.includes('CV')) return 'CV';
  return branch;
};

const normalizeScheme = (scheme?: string): string | undefined => {
  if (!scheme) return undefined;
  const match = scheme.match(/\d{4}/);
  return match ? match[0] : scheme;
};

const mapFormatToResourceType = (format?: string, title: string = ''): ResourceType => {
  const fmt = (format || '').toUpperCase();
  const t = title.toLowerCase();
  if (fmt === 'HANDWRITTEN' || t.includes('handwritten')) return 'Handwritten Notes';
  if (fmt === 'SHORT_NOTES' || t.includes('short')) return 'Short Notes';
  if (fmt === 'REVISION_NOTES' || t.includes('revision')) return 'Revision Notes';
  if (fmt === 'PPT') return 'PPT';
  return 'Typed Notes';
};

const extractNotesList = (response: any): any[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.items)) return response.items;
  if (Array.isArray(response.data)) return response.data;
  if (response.data && Array.isArray(response.data.items)) return response.data.items;
  if (response.data && Array.isArray(response.data.data)) return response.data.data;
  return [];
};

const extractSingleNote = (response: any): any => {
  if (!response) return null;
  if (response.id) return response;
  if (response.data && response.data.id) return response.data;
  if (response.data && response.data.data && response.data.data.id) return response.data.data;
  return null;
};

export const fetchNotesFromApi = async (params: QueryNotesParams = {}): Promise<NoteResource[]> => {
  try {
    const queryParams: any = {};
    if (params.semester) queryParams.semester = params.semester;
    if (params.branchCode) queryParams.branchCode = normalizeBranch(params.branchCode);
    if (params.schemeYear) queryParams.schemeYear = normalizeScheme(params.schemeYear);
    if (params.subjectCode) queryParams.subjectCode = params.subjectCode;
    if (params.search) queryParams.search = params.search;
    if (params.format) queryParams.format = params.format;

    let response: any = await apiClient.get('/notes', { params: queryParams });
    let rawNotes = extractNotesList(response);

    // Fallback 1: Query by semester if specific branch/scheme combo returned empty
    if (rawNotes.length === 0 && params.semester) {
      response = await apiClient.get('/notes', { params: { semester: params.semester } });
      rawNotes = extractNotesList(response);
    }

    // Fallback 2: Fetch all top published notes without any filter
    if (rawNotes.length === 0) {
      response = await apiClient.get('/notes');
      rawNotes = extractNotesList(response);
    }

    if (rawNotes.length === 0) {
      return MOCK_RESOURCES;
    }

    return rawNotes.map((note: any): NoteResource => {
      return {
        id: note.id,
        title: note.title,
        subjectId: note.courseId || note.subjectId || 's-1',
        subjectName: note.subjectName || 'Computer Networks',
        subjectCode: note.subjectCode || '21CS52',
        unitNumber: note.unitNumber || 1,
        unitTitle: note.unitTitle || 'Module Notes',
        type: mapFormatToResourceType(note.format, note.title),
        fileFormat: 'PDF',
        fileSize: note.fileSize || '2.4 MB',
        author: note.authorName || 'VTU Faculty Panel',
        downloadsCount: note.downloads || note.downloadCount || note.downloadsCount || 0,
        isBookmarked: false,
        isDownloaded: false,
        description: note.description || '',
        totalPages: (note.pageCount && Number(note.pageCount) > 1) ? Number(note.pageCount) : 15,
        isPaid: note.isPaid || (note.price && note.price > 0) || false,
        price: note.price || 0,
        freePreviewPages: note.freePreviewPages || 2,
        isPurchased: false,
        fileUrl: note.secureUrl || note.fileUrl || '',
      };
    });
  } catch (error: any) {
    console.warn('[fetchNotesFromApi Fallback]:', error?.message || error);
    return MOCK_RESOURCES;
  }
};

export const fetchNoteByIdFromApi = async (id: string): Promise<NoteResource | null> => {
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

  if (!isUuid) {
    const allNotes = await fetchNotesFromApi();
    const found = allNotes.find((r) => r.id === id) || allNotes[0];
    return found || null;
  }

  try {
    const response: any = await apiClient.get(`/notes/${id}`);
    const note = extractSingleNote(response);

    if (!note || !note.id) {
      const allNotes = await fetchNotesFromApi();
      return allNotes[0] || null;
    }

    return {
      id: note.id,
      title: note.title,
      subjectId: note.courseId || note.subjectId || 's-1',
      subjectName: note.subjectName || 'Computer Networks',
      subjectCode: note.subjectCode || '21CS52',
      unitNumber: note.unitNumber || 1,
      unitTitle: note.unitTitle || 'Module Notes',
      type: mapFormatToResourceType(note.format, note.title),
      fileFormat: 'PDF',
      fileSize: note.fileSize || '2.4 MB',
      author: note.authorName || 'VTU Faculty Panel',
      downloadsCount: note.downloads || note.downloadCount || note.downloadsCount || 0,
      isBookmarked: false,
      isDownloaded: false,
      description: note.description || '',
      totalPages: (note.pageCount && Number(note.pageCount) > 1) ? Number(note.pageCount) : 15,
      isPaid: note.isPaid || (note.price && note.price > 0) || false,
      price: note.price || 0,
      freePreviewPages: note.freePreviewPages || 2,
      isPurchased: false,
      fileUrl: note.secureUrl || note.fileUrl || '',
    };
  } catch (error: any) {
    const allNotes = await fetchNotesFromApi();
    return allNotes[0] || null;
  }
};

export const fetchSubjectsFromApi = async (params: { semester?: number; branchCode?: string; schemeYear?: string } = {}): Promise<Subject[]> => {
  try {
    const response: any = await apiClient.get('/academics/courses', { params });
    const payload = response.data || response;
    const rawCourses = Array.isArray(payload) ? payload : payload.items || payload.data || [];

    if (!Array.isArray(rawCourses) || rawCourses.length === 0) {
      return MOCK_SUBJECTS;
    }

    return rawCourses.map((course: any, idx: number): Subject => ({
      id: course.id || `c-${idx}`,
      code: course.subjectCode || course.code || '21CS51',
      name: course.name || course.subjectName || course.title || 'Academic Course',
      semester: course.semester || params.semester || 5,
      branch: course.branchCode || params.branchCode || 'CSE',
      unitCount: 5,
      resourceCount: course.notesCount || course._count?.notes || 12,
      progress: Math.floor(Math.random() * 40) + 40,
      iconName: 'book-open',
      iconBg: '#EEF2FF',
      iconColor: '#0745E8',
    }));
  } catch (error: any) {
    console.warn('[fetchSubjectsFromApi Fallback]:', error?.message || error);
    return MOCK_SUBJECTS;
  }
};

