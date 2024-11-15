export default class Grid {
    constructor(targetElement) {
        this.targetElement = targetElement;
    }

    init() {
        this.targetElement.innerHTML = "<table><thead></thead><tbody></tbody></table>";
        this.thead = this.targetElement.querySelector("thead");
        this.tbody = this.targetElement.querySelector("tbody");
    }

    showColumns(columnNames) {
        const createColumn = (name) => { 
            const self = this;
            const { gridData } = this; // ?
            const gridData1 = this.gridData; //same as above
    
            const th = document.createElement("th");
            th.innerHTML = `<span>${name}</span><span class="sortImage material-icons" data-sort="none"></span>`;
    
            th.onclick = (e) => { // never use => in event handler, because context. use function() instead
                const sortImage = e.currentTarget.querySelector("span.sortImage");
                let sort = sortImage.dataset.sort; 
                sort = (sort === "asc") ? "desc" : "asc"; // linter will not like the ()
             
                const idx = self.columns.indexOf(e.currentTarget); //just use gridData
                self.data.sort((a,b) => {
                    if (a[idx] === b[idx]) {
                        return 0;
                    }
                    else {
                        if (sort === "asc") return (a[idx] < b[idx]) ? -1 : 1;
                        else return (a[idx] > b[idx]) ? -1 : 1;
                    }
                });
    
                self.thead.querySelectorAll("th span.sortImage").forEach((d) => {
                    d.dataset.sort = "none"; 
                });
                sortImage.dataset.sort = sort;    
                self.renderPage();
            };
            return th;
        }

        this.columns = columnNames.map((name) => createColumn(name));
        this.thead.innerHTML = "";
        this.columns.forEach((c) => this.thead.appendChild(c));
    }

    showData(data) {
        this.data = data;

        this.pageSize = 10;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.data.length / this.pageSize);

        this.createPager();
        this.renderPage();
    }

    renderPage() {
        this.tbody.innerHTML = "";
        const startPos = (this.currentPage - 1) * this.pageSize;

        let res = "";
        for (let i = startPos; i < startPos + this.pageSize && i < this.data.length; i++)
        {
            let tr = "";
            this.data[i].forEach(td => {
                tr += `<td>${td}</td>`;
            });
            res += `<tr>${tr}</tr>`; 
        }

        this.tbody.innerHTML = res;
    }

    createPager() {
        this.pager = document.createElement("div");
        this.targetElement.insertBefore(this.pager, null);

        this.renderPager();
    }

    renderPager() {       
        const createPagerButton = (text, pageNr) => {
            const button = document.createElement("a");
            button.innerText = text;
            button.onclick = (e) => {
                e.preventDefault();
                if (pageNr < 1 || pageNr > this.totalPages) return;

                this.currentPage = pageNr;
                this.renderPager();
                this.renderPage();
            }
            return button;
        };
        
        const span = document.createElement("span");
        span.innerText = `page ${this.currentPage} of ${this.totalPages}`;

        this.pager.innerHTML = "";

        if (this.currentPage > 1) {
            this.pager.appendChild(createPagerButton("<<", 1));
            this.pager.appendChild(createPagerButton("<", this.currentPage - 1));
        }

        this.pager.appendChild(span);

        if (this.currentPage < this.totalPages) {
            this.pager.appendChild(createPagerButton(">", this.currentPage + 1));
            this.pager.appendChild(createPagerButton(">>", this.totalPages));
        }
    }

}