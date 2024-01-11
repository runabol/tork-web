export function downloadLogs(id: string, content: string) {

	if (!content) {
			alert("Nothing to download");
			return;
	}

	const name = `tork-${id}.txt`;

	const blob = new Blob([content], { type: "text/plain" });

	const a = document.createElement("a");
	const url = URL.createObjectURL(blob);

	a.href = url;
	a.download = name;

	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
