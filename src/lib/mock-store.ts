import { mockProperties } from "@/lib/mock-data";

export type MockLead = Record<string, unknown> & {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MockSiteVisit = Record<string, unknown> & {
  id: string;
  name: string;
  phone: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MockSellerSubmission = Record<string, unknown> & {
  id: string;
  ownerName: string;
  phone: string;
  status: string;
  createdAt: Date;
};

const globalForMock = globalThis as typeof globalThis & {
  __gewaMockStore?: {
    properties: typeof mockProperties;
    leads: MockLead[];
    siteVisits: MockSiteVisit[];
    sellerSubmissions: MockSellerSubmission[];
    analyticsEvents: Record<string, unknown>[];
  };
};

export const mockStore =
  globalForMock.__gewaMockStore ??
  {
    properties: mockProperties.map((property) => ({ ...property })),
    leads: [],
    siteVisits: [],
    sellerSubmissions: [],
    analyticsEvents: [],
  };

if (process.env.NODE_ENV !== "production") {
  globalForMock.__gewaMockStore = mockStore;
}

export function mockId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
