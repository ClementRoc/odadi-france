<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RGPDController extends AbstractController
{
    /**
     * @Route("/données-personnelles", name="app_data", methods="GET")
     */
    public function data(): Response
    {
        return $this->render('rgpd/data.html.twig');
    }

    /**
     * @Route("/mentions-légales", name="app_legal", methods="GET")
     */
    public function legal(): Response
    {
        return $this->render('rgpd/legal.html.twig');
    }
}