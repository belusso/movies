
import * as assert from 'assert';
import { setupBrowserHooks, getBrowserState } from './utils';

describe('App running', function () {
  setupBrowserHooks('dashboard');
  it('Running', async function () {
    const { page } = getBrowserState();
    const element = await page.locator('::-p-text(Victor Belusso)').wait();
    assert.ok(element);
  });
})

describe('App Dashboard', function () {
  setupBrowserHooks('dashboard');
  it('DashBoard -> List years with multiple winners', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('#card1 table tbody tr.ant-table-row')
    const length = (await page.$$('#card1 table tbody tr.ant-table-row')).length
    // verificando se tem exatamente 3
    assert.ok(length > 0, 'Deve apresentar registros');
  });

  it('DashBoard -> Top 3 studios with winners', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('#card2 table tbody tr.ant-table-row')
    const length = (await page.$$('#card2 table tbody tr.ant-table-row')).length
    // verificando se tem exatamente 3
    assert.ok(length === 3, 'Top 3 deve apresentar 5 studios');
  });

  it('DashBoard -> Producers with longest and shortest interval between wins', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('#card3 #table1 tbody tr.ant-table-row')
    const table1 = (await page.$$('#card3 #table1 tbody tr.ant-table-row')).length
    await page.waitForSelector('#card3 #table2 tbody tr.ant-table-row')
    const table2 = (await page.$$('#card3 #table2 tbody tr.ant-table-row')).length
    // verificando se tem um registro por tabela
    assert.ok(table1 === 1 && table2 === 1, 'Deve apresentar 1 max e 1 min');
  });

  it('DashBoard -> List movie winners by year', async function () {
    const { page } = getBrowserState();
    // wait for table with no content
    await page.waitForSelector('#card4 table tbody tr.ant-table-placeholder')
    // type year
    await page.focus('#card4 input');
    await page.type('#card4 input', '2008');
    // click button
    await page.waitForSelector('#card4 button:not([disabled])');
    await page.click('#card4 button');
    await page.waitForSelector('#card4 table tbody tr.ant-table-row')
    const length = (await page.$$('#card4 table tbody tr.ant-table-row')).length
    assert.ok(length > 0, 'Deve listar filmes em 2008 - CONSIDERANDO QUE EXISTE');
  });
});


describe('App List', function () {
  setupBrowserHooks('list');
  it('List -> Movies 2008', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('table tbody tr.ant-table-row')
    await page.type('input', '2008');
    await page.waitForSelector('.ant-spin')
    await page.waitForFunction('document.querySelector(".ant-spin") === null')
    await page.waitForSelector('table tbody tr.ant-table-row')
    const length = (await page.$$('table tbody tr.ant-table-row')).length
    assert.ok(length === 5, 'Total de filmes em 2008 é 5');
  })

  it('List -> Movies 2008 Vencedores', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('table tbody tr.ant-table-row')
    await page.type('input', '2008');
    await page.waitForSelector('.ant-spin')
    await page.waitForFunction('document.querySelector(".ant-spin") === null')
    await page.waitForSelector('table tbody tr.ant-table-row')
    await page.focus('input');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.ant-spin')
    await page.waitForFunction('document.querySelector(".ant-spin") === null')
    await page.waitForSelector('table tbody tr.ant-table-row')
    const length = (await page.$$('table tbody tr.ant-table-row')).length
    // await new Promise(resolve => setTimeout(resolve, 1000));
    assert.ok(length === 1, 'Total de filmes em 2008 Vencedores é 1');
  })

  it('List -> Movies 2008 Não Vencedores', async function () {
    const { page } = getBrowserState();
    await page.waitForSelector('table tbody tr.ant-table-row')
    await page.type('input', '2008');
    await page.waitForSelector('.ant-spin')
    await page.waitForFunction('document.querySelector(".ant-spin") === null')
    await page.waitForSelector('table tbody tr.ant-table-row')
    await page.focus('input');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.ant-spin')
    await page.waitForFunction('document.querySelector(".ant-spin") === null')
    await page.waitForSelector('table tbody tr.ant-table-row')
    const length = (await page.$$('table tbody tr.ant-table-row')).length

    // await new Promise(resolve => setTimeout(resolve, 1000));
    assert.ok(length === 4, 'Total de filmes em 2008 Não Vencedores é 4');

  });
})