const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require ('path')
const data = require('./database.json');
const moment = require('moment');
const express = require('express');
const app = express();

const compile = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};
hbs.registerHelper('dateFormat', function(value, format) {
    return moment(value).format(format);
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/pdf',async (req,res) => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const content = await compile('invoice', data);
        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.setViewport({ width: 1680, height: 1050 });
        const todays_date = new Date();
        const pdfURL = path.join(__dirname, 'files', todays_date.getTime() + '.pdf');
        await page.addStyleTag({
        content: `
        body { border: 1px solid #ccc }
        `
        });
        const pdf=await page.pdf({
        path: pdfURL,
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;">
                            ${new Date().toDateString()}
                            <span style="margin-left: 10px;">Generated PDF</span>
                        </div>`,
        footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
                            Generated PDF
                            <span style="display:inline-block;float:right;margin-right:10px;">
                                <span class="pageNumber"></span> / <span class="totalPages"></span>
                            </span>
                        </div>`,
        margin: {
            top: '38px',
            right: '38px',
            bottom: '38px',
            left: '38px'
        }
        });
        console.log('done generating pdf');
        await browser.close();
        res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length
        });
        res.sendFile(pdfURL);
    }catch (e) {
        console.log('our error', e);
    }
  });


app.listen(5000, () => {
    console.log('server started on port 5000')
});