DELIMITER //

DROP PROCEDURE IF EXISTS MenuCount //
CREATE PROCEDURE MenuCount()
BEGIN
    select count(*) as numMenu from menu M where M.location is not null;
END
//

DROP PROCEDURE IF EXISTS ShowMenuInfo//
CREATE PROCEDURE ShowMenuInfo(
    IN searchKey    VARCHAR(50),
    IN orderBy      VARCHAR(100),
    IN startPos     INT,
    IN pageSize     INT
)
BEGIN
    if searchKey is null OR searchKey='' then
        if orderBy='Date' then
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]'
            order by year desc limit pageSize offset startPos;
        elseif orderBy='Name' then
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]'
            order by location asc limit pageSize offset startPos;
        else
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]'
            order by dish_count desc limit pageSize offset startPos;
        end if;
    else
        if orderBy='Date' then
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]' and
                  location like concat('%', searchKey, '%')
            order by year desc limit pageSize offset startPos;
        elseif orderBy='Name' then
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]' and
                  location like concat('%', searchKey, '%')
            order by location asc limit pageSize offset startPos;
        else
            select M.id, M.location, year(M.date) as year, M.dish_count
            from menu M
            where location not regexp '^[\?\'\"\(\\[\ ]' and
                  location like concat('%', searchKey, '%')
            order by dish_count desc limit pageSize offset startPos;
        end if;
    end if;
END
//

DROP PROCEDURE IF EXISTS ShowDishInfo//
CREATE PROCEDURE ShowDishInfo(
    IN searchKey    VARCHAR(50),
    IN orderBy      VARCHAR(100),
    IN startPos     INT,
    IN pageSize     INT
)
BEGIN
    if searchKey is null OR searchKey='' then
        if orderBy='Name' then
            select D.name, D.menus_appeared, D.times_appeared
            from dish D
            where D.name not regexp '^[\-\:\;\!\,\.\?\'\"\*\<\#\(\\[\ ]'
            order by D.name asc limit pageSize offset startPos;
        else
            select D.name, D.menus_appeared, D.times_appeared
            from dish D
            where D.name not regexp '^[\-\:\;\!\,\.\?\'\"\*\<\#\(\\[\ ]'
            order by D.menus_appeared desc limit pageSize offset startPos;
        end if;
    else
        if orderBy='Name' then
            select D.name, D.menus_appeared, D.times_appeared
            from dish D
            where D.name not regexp '^[\-\:\;\!\,\.\?\'\"\*\<\#\(\\[\ ]' and
                  D.name like concat('%', searchKey, '%')
            order by D.name asc limit pageSize offset startPos;
        else
            select D.name, D.menus_appeared, D.times_appeared
            from dish D
            where D.name not regexp '^[\-\:\;\!\,\.\?\'\"\*\<\#\(\\[\ ]' and
                  D.name like concat('%', searchKey, '%')
            order by D.menus_appeared desc limit pageSize offset startPos;
        end if;
    end if;
END
//

DROP PROCEDURE IF EXISTS ShowDishOfMenu//
CREATE PROCEDURE ShowDishOfMenu(
    IN menuID      INT
)
BEGIN
    declare numResult int;
    select count(*) into numResult from menu where id=menuID;

    if numResult=0 then
        select 'No such menu' as 'Error Message';
    else
        select * from menu where id=menuID;
        # dish info for that menu
        select D.name, MP.page_number, MI.price
        from menu M, menu_page MP, menu_item MI, dish D
        where M.id=menuID and M.id=MP.menu_id and MP.id=MI.menu_page_id and
              MI.dish_id=D.id
        order by MP.page_number, D.name;
    end if;
END //


DELIMITER ;