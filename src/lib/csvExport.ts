export interface RegistrationData {
  id?: string;
  teamName: string;
  university: string;
  memberCount: number;
  status: string;
  submittedAt?: any;
  leader: {
    fullName: string;
    email: string;
    phone: string;
    studentId: string;
  };
  member2?: {
    fullName: string;
    email: string;
    phone: string;
    studentId: string;
  };
  member3?: {
    fullName: string;
    email: string;
    phone: string;
    studentId: string;
  };
}

export function exportRegistrationsToCSV(data: RegistrationData[]) {
  if (!data || data.length === 0) {
    alert("No registration records available to export.");
    return;
  }

  const headers = [
    "Registration ID",
    "Submission Date",
    "Team Name",
    "University",
    "Member Count",
    "Status",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "Leader Student ID",
    "Member 2 Name",
    "Member 2 Email",
    "Member 2 Phone",
    "Member 2 Student ID",
    "Member 3 Name",
    "Member 3 Email",
    "Member 3 Phone",
    "Member 3 Student ID",
  ];

  const escapeCSV = (str: string | undefined | null) => {
    if (!str) return '""';
    const escaped = String(str).replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = data.map((reg) => {
    let dateStr = "";
    if (reg.submittedAt) {
      if (typeof reg.submittedAt.toDate === "function") {
        dateStr = reg.submittedAt.toDate().toLocaleString();
      } else if (reg.submittedAt.seconds) {
        dateStr = new Date(reg.submittedAt.seconds * 1000).toLocaleString();
      } else {
        dateStr = String(reg.submittedAt);
      }
    }

    return [
      escapeCSV(reg.id || ""),
      escapeCSV(dateStr),
      escapeCSV(reg.teamName),
      escapeCSV(reg.university),
      escapeCSV(String(reg.memberCount)),
      escapeCSV(reg.status || "PENDING"),
      escapeCSV(reg.leader?.fullName || ""),
      escapeCSV(reg.leader?.email || ""),
      escapeCSV(reg.leader?.phone || ""),
      escapeCSV(reg.leader?.studentId || ""),
      escapeCSV(reg.member2?.fullName || ""),
      escapeCSV(reg.member2?.email || ""),
      escapeCSV(reg.member2?.phone || ""),
      escapeCSV(reg.member2?.studentId || ""),
      escapeCSV(reg.member3?.fullName || ""),
      escapeCSV(reg.member3?.email || ""),
      escapeCSV(reg.member3?.phone || ""),
      escapeCSV(reg.member3?.studentId || ""),
    ].join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = `Enigma_2026_Registrations_${new Date().toISOString().split("T")[0]}.csv`;

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
